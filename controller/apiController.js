var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

// make some endpoint
module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/api/todos/:uname',function(req,res){

        Todos.find({username:req.params.uname},function(err,todos){
            if(err) throw err;

            res.send(todos);
        });

    });

    app.get('/api/todo/:id',function(req,res){

        Todos.findById({_id:req.params.id},function(err,todo){
            if(err) throw err;

            res.send(todo);
        });

    });

    app.post('/api/todo',function(req,res){

        // update (傳來的資料，有指定id的話，就視為是要update的)
        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id,{
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            },function(err,todo){
                if(err) throw err;

                res.send('updated Successfully');
            });
        } else { // new

            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err){
                if(err) throw err;

                res.send('saved successfully');
            });

        }

    });

    app.delete('/api/todo',function(req,res){

        Todos.findByIdAndRemove(req.body.id,function(err){
            if(err) throw err;

            res.send('deleted successfully')
        });

    });

}
