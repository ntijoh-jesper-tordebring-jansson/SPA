require 'debug'
require 'uuidtools'
# use binding.break for debug

class Server < Sinatra::Base

    def initialize
        super
        @db = SQLite3::Database.new('db/company.db')
        @db.results_as_hash = true
    end

    before do
        #content_type :json
        #headers 'Access-Control-Allow-Origin' => '*',
        #        'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
    end

    set :protection, false

    get '/' do
        redirect('/app');
    end

    # Build the app using this route to deliver js for the SPA.
    get '/app' do
        erb :app
    end

    #CRUD-interface med JS

    #index
    get '/api/employees' do
        content_type :json
        @db.execute('SELECT * FROM employees').to_json
    end

    # #new
    # get '/api/employees/new' do
    #     content_type :json
    #     {formFields: [{name:  'text'},
    #               {email: 'text'},
    #               {phone: 'tel'},
    #               {department_id: 'number'},
    #               {img:  'image'}]}.to_json
    # end

    #show
    get '/api/employees/:id' do
        content_type :json
        @db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first.to_json
    end

    #edit
    get '/api/employees/:id/edit' do
        content_type :json
        result = @db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first
        {employee: result,
         formFields: [
                {name: 'name',          type: 'text',   value: result['name']},
                {name: 'email',         type: 'text',   value: result['email']},
                {name: 'phone',         type: 'tel',    value: result['phone']},
                {name: 'department_id', type: 'number', value: result['department_id']},
                {name: 'img',           type: 'img',    value: result['img']}
            ]}.to_json
    end

    #update
    patch '/api/employees/:id' do
        name = params['name']
        mail = params['mail']
        phone = params['phone']
        department_id = params['department_id']
        id = params['id']

        puts name;
        puts mail;
        puts phone;
        puts department_id;
        puts id;

        @db.execute('UPDATE employees SET name=?, email=?, phone=?, department_id=? WHERE id=?', [name, mail, phone, department_id, id])
        
    end

    post '/api/employees/' do
        uploadDir = './public/img/'
      
        name = params['name']
        mail = params['mail']
        phone = params['phone']
        department_id = params['department_id']
        
        file = params['file']

        filename = UUIDTools::UUID.random_create.to_s

        tempfile = file[:tempfile]

        filepath = File.join(uploadDir, filename)

        FileUtils.cp(tempfile.path, filepath)

        @db.execute('INSERT into employees (name, email, phone, department_id, img) VALUES (?,?,?,?,?)', [name, mail, phone, department_id, filename])

    end

    #destroy
    delete '/api/employees/:id' do
        puts params['id'];
        @db.execute('DELETE FROM employees WHERE id = ?', params['id']);
        puts "hhehehehhehe";
    end

end
