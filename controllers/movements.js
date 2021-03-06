const Movement = require('../models/Movement');

//method: GET http://localhost:3001/api/movements 
//action: get all movements
exports.getMovements = async (req,res) => {
    try {
        //by no defining arguments for .find we get an array of all objects
        const movements = await Movement.find();
        return res.status(200).json({
            success: true,
            length: movements.length,
            data: movements
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: `Server error: ${err}`
        })
    }
}

//method: POST http://localhost:3001/api/movements
//action: add a new movement
exports.addMovement = async (req,res) => {
    try {
        // const {movementCategory } = req.body;

        // //sort of Category validation. Valid categories are defined as ENV variable array.
        // //TODO: improve this, using another database?
        // if (!process.env.LIMITED_CATEGORIES.includes(movementCategory)){
        //     return res.status(400).json({
        //         success: false,
        //         error: 'Invalid Category'
        //     })
        // }
        const movementToAdd = await Movement.create(req.body);

        return res.status(201).json({
            success: true,
            data: movementToAdd
        })
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
      
            return res.status(400).json({
              success: false,
              error: messages
            });
          } else {
            return res.status(500).json({
              success: false,
              error: `Server Error: ${err}`
            });
          }
    }
}

//method: DELETE http://localhost:3001/api/movements/:id
//action: deletes movement where _id = :id
exports.deleteMovement = async (req,res) => {

    try {
        const movementToDelete = await Movement.findById(req.params.id);

        if(!movementToDelete){
            return res.status(404).json({
                success: false, error:`No movement was found with the id: ${req.params.id}`
            })
        }

        await movementToDelete.deleteOne();

        return res.status(200).json({
            success:true,
            data:{}
        })
        
    } catch (err) {
        if (err.name === 'CastError'){
            return res.status(404).json({
                success: false, error:`No movement was found with the id: ${req.params.id}`
            })
        }
        return res.status(500).json({
            success: false,
            error: `Server Error: ${err}`
        })
    }
}

//method: PATCH http://localhost:3001/api/movements/:id
//action: updates movement where _id = :id, by changing everything that is defined in the req.body (only what is defined, not replacing the whole movement like PUT method)
exports.editMovement = async (req,res) => {
    try {

        // const {movementCategory } = req.body;
        // //sort of Category validation. Valid categories are defined as ENV variable array.
        // //TODO: improve this, using another database?
        // if (movementCategory && !process.env.LIMITED_CATEGORIES.includes(movementCategory)){
        //     return res.status(400).json({
        //         success: false,
        //         error: 'Invalid Category'
        //     })
        // }

        //by no adding {new:true} as third argument, after updating the movementToUpdate still shows old info
        const movementToUpdate = await Movement.findByIdAndUpdate(req.params.id, req.body);
        if(!movementToUpdate){
            return res.status(404).json({
                success: false, 
                error:`No movement was found with the id: ${req.params.id}`
            })
        }

        //forcing a refresh
        const movementUpdated = await Movement.findById(req.params.id);

        return res.status(201).json({
            success: true,
            originalData: movementToUpdate,
            newdata: movementUpdated
        })
        
    } catch (err) {
        if (err.name === 'CastError'){
            return res.status(404).json({
                success: false, 
                error:`No movement was found with the id: ${req.params.id}`
            })
        }
        return res.status(500).json({
            success: false,
            error: `Server Error: ${err}`
        })
    }
    
}