

[ 2019-11-30 ]

    - Create tables diretório em ./database_tables

    -- GET
        - curl -X GET -i http://localhost:3003/users 
        - curl -X GET -i 'Accept: application/json' http://localhost:3003/v1/users

    -- POST

        - json
             curl -X POST -i --header 'Content-Type: application/json' --header 'Accept: application/json; charset=utf-8' -d '{
                  "name": "Maria Conceição",
                  "email": "conceicao@gmail.com"
                }' 'http://localhost:3003/v1/users'


        - form
            curl  -X POST -i --header 'Content-Type: multipart/form-data; boundary=something' -d "name=Rafael%20Sagula&email=conceicao@gmail.com" http://localhost:3003/v1/users
            curl  -X POST -i --header 'Content-Type: text/html; charset=utf-8' -d "name=jao&email=jao@gmail.com" http://localhost:3003/v1/users


        -- application/x-www-form-urlencoded: 
            # Ulitzado qunado há um volume grande de arquivos, ou seja apenas, texto
              referencia: https://pt.stackoverflow.com/questions/103157/qual-%C3%A9-a-diferen%C3%A7a-entre-x-www-form-urlencoded-e-form-data
                curl  -X POST -i  --header 'application/x-www-form-urlencod' -d "name=jao&email=jao@gmail.com" http://localhost:3003/v1/users

        -- application/xml
               
            curl -H "Content-Type: application/xml"  
            -d "<?xml version="""1.0""" encoding="""UTF-8""" standalone="""yes"""?><name>Nome XML</name><email>xml@gmail.com</email>"  
            http://localhost:3003/v1/users


    -- PATCH
            - json
                curl -X PATCH -i --header 'Content-Type: application/json' --header 'Accept: application/json; charset=utf-8' -d '{
                  "email": "conceicao@gmail.com"
                }' 'http://localhost:3003/v1/users/5'

    -- PUT
        - json
            curl -X PUT -i --header 'Content-Type: application/json' --header 'Accept: application/json; charset=utf-8' -d '{
              "name": "Jorge Santana",
              "email": "santana@gmail.com"
            }' 'http://localhost:3003/v1/users/5'


    -- DELETE
        curl -X DELETE --header 'Accept: application/json' 'http://localhost:3003/v1/users/5'
        

[ 2019-12-01 ]
    
    -- npm install validator
        https://github.com/validatorjs/validator.js

