# talks-mongodb
Hands on no Schema validation do Mongo DB

Usando o docker, executar o comando:

`sudo docker run --name mongodb -d mongo:latest`

Para instalação no S.O.

[Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

# Schema Validation
## validationLevel

Opção que determina como o Mongo deve aplicar restrições durante uma atualização .

* validationLevel: "moderate" Ao inserir/Editar vários documentos, ele vai aceitar apenas aqueles que atenderem aos critérios, rejeitando apenas aos que não atenderem.

* validationLevel: strict ignora todos se algum não atender os critérios

* validationLevel: "off" Desliga qualquer validação

## validationAction

Opção que determina se o Mongo deve rejeitar ou apenas logar um aviso (warning) no log e aceitar documentos que violem as restrições.


* validationAction: error rejeita qualquer restrição violada

* validationAction: warn aceita e apenas avisa no log

# db.createCollection()
Diferente do habitual, precisamos utilizar o comando `db.createCollection(...)` com as configurações de restrições (Schema Validations) como parâmetro.

Exemplo:

```javascript
db.createCollection("students", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "year", "major", "address" ],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            year: {
               bsonType: "int",
               minimum: 2017,
               maximum: 3017,
               description: "must be an integer in [ 2017, 3017 ] and is required"
            },
            major: {
               enum: [ "Math", "English", "Computer Science", "History", null ],
               description: "can only be one of the enum values and is required"
            },
            gpa: {
               bsonType: [ "double" ],
               description: "must be a double if the field exists"
            },
            address: {
               bsonType: "object",
               required: [ "city" ],
               properties: {
                  street: {
                     bsonType: "string",
                     description: "must be a string if the field exists"
                  },
                  city: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  }
               }
            }
         }
      }
   }
})
```

# db.getCollectionInfos()

Operação para exibir informações sobre restrições e validações no schema.


# Ignorar validação de documento

Os usuários podem ignorar a validação do documento usando a opção **bypassDocumentValidation**.

Os seguintes comandos podem ignorar a validação por operação usando a nova opção **bypassDocumentValidation**:
* `applyOps`
* `findAndModify` e `db.collection.findAndModify()` 
* `mapReduce` e `db.collection.mapReduce()` 
* `insert` 
* `update` 
* `$out` e `$merge` para o comando `aggregate` e `db.collection.aggregate()`


[https://docs.mongodb.com/manual/core/schema-validation/](https://docs.mongodb.com/manual/core/schema-validation/)