class TodoController {
    static listMovies(req, res, next) {
        const todoList = {
            data: [
                { title: "Todo 1" },
                { title: "Todo 2" },
                { title: "Todo 3" },
                { title: "Todo 4" },
                { title: "Todo 5" }
            ],
            message: 'success'
        }
        res.status(200).json(todoList)
    }
}

module.exports = TodoController;