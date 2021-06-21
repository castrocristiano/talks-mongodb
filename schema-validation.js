/*db.getCollection('contatos').find({})

db.contatos.update({"nome": "Cristiano", "idade": 33}, 
{"nome": "Cristiano Castro", "idade": 33});
*/
use('talks-handson');

db.getCollectionInfos();

db.createCollection("estudantes", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "nome", "ano", "disciplina", "nota" ],
          properties: {
            nome: {
                bsonType: "string",
                description: "Deve ser uma string e é obrigatória!"
             },
             ano: {
                bsonType: "int",
                minimum: 2017,
                maximum: 3017,
                description: "Deve ser um inteiro entre [ 2017, 3017 ] e é obrigatório!"
             },
             disciplina: {
                enum: [ "Mat", "Port", "Hist", "Geo", null ],
                description: "Deve ser apenas um ENUM e é obrigatório"
             },
             nota: {
                bsonType: [ "double" ],
                description: "Precisa ser double se o campo existir"
             },
             endereco: {
                bsonType: "object",
                required: [ "cidade" ],
                properties: {
                   rua: {
                      bsonType: "string",
                      description: "Deve ser uma string se o campo existir."
                   },
                   cidade: {
                      bsonType: "string",
                      description: "Deve ser uma string e é obrigatória!"
                   }
                }
             }
          }
       }
    }
 });

 db.estudantes.insert({
    "nome" : "Zé",
    "ano" : 2020,
    "disciplina" : "Mat",
    "nota" : 7.5,
    "endereco" : {
        "cidade" : "Restinga Seca"
    }
});