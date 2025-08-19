import Todo from "../model/todo-model.js";

const getTodos = async (req, res) => {
  try {
    console.log("User ID:", req.user?.id); 
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const todos = await Todo.find({ user: req.user.id })
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const addTodos = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const { task, description } = req.body;

    if (!task || task.trim() === "") {
      return res.status(400).json({ msg: "Task is required" });
    }

    const newTodo = await Todo.create({
      user: req.user.id,
      task: task.trim(),
      description: description ? description.trim() : "",
    });

    console.log("New todo created:", newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Add todo error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const editTodos = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ msg: "Todo ID is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to edit this todo" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { 
      new: true,
      runValidators: true 
    }).populate('assignedTo', 'name email')
     .populate('assignedBy', 'name email');
    
    res.json(updatedTodo);
  } catch (error) {
    console.error("Edit todo error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteTodos = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ msg: "Todo ID is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to delete this todo" });
    }

    await Todo.findByIdAndDelete(id);
    res.json({ msg: "Todo deleted successfully", id });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const assignTask = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const { id } = req.params;
    const { assignedTo } = req.body;

    if (!id) {
      return res.status(400).json({ msg: "Task ID is required" });
    }

    if (!assignedTo) {
      return res.status(400).json({ msg: "Assigned user ID is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to assign this todo" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        assignedTo: assignedTo,
        assignedBy: req.user.id
      },
      { new: true }
    ).populate('assignedTo', 'name email')
     .populate('assignedBy', 'name email')
     .populate('user', 'name email');

    res.json({
      msg: "Task assigned successfully",
      todo: updatedTodo
    });
  } catch (error) {
    console.error("Assign task error:", error);
    res.status(500).json({ msg: error.message });
  }
};


const getDashboard = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const userId = req.user.id;
    console.log("Dashboard request for user:", userId);

   
    const assignedByMe = await Todo.find({ 
      assignedBy: userId,
      assignedTo: { $exists: true, $ne: null }
    })
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    console.log("Tasks assigned by me:", assignedByMe.length);

   
    const assignedToMe = await Todo.find({ 
      assignedTo: userId 
    })
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    console.log("Tasks assigned to me:", assignedToMe.length);

 
    if (assignedByMe.length > 0) {
      console.log("Sample assignedByMe task:", JSON.stringify(assignedByMe[0], null, 2));
    }
    if (assignedToMe.length > 0) {
      console.log("Sample assignedToMe task:", JSON.stringify(assignedToMe[0], null, 2));
    }

    const response = {
      assignedByMe,
      assignedToMe
    };

    res.json(response);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ msg: error.message });
  }
};

export { getTodos, addTodos, editTodos, deleteTodos, assignTask, getDashboard };