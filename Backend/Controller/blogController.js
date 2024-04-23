const mongoose  = require("mongoose");
const { findById } = require("../model/blogModel");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

// GET All Blogs
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user') // getting all the blog from model by doing this find({}) with user
    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    return res.status(200).send({
      success: true,
      Blogcount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

//create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image , user} = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const existingUser = await userModel.findById(user);
    if(!existingUser){
      return res.status(400).send({
        success: false,
        message: "Unable to find User!",
        error
      })
    }

    // creating new instance
    const newBlog = new blogModel({ title, description, image, user });

    // pusing the blog into userModel 'blog' array 
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({session})
    existingUser.blogs.push(newBlog)  // existingUser - blogs feild in documents - pusing new blog to it
    await existingUser.save({session});
    await session.commitTransaction();

    await newBlog.save();
    return res.status(200).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

// update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    ); //spread

    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating blog!",
      error,
    });
  }
};

// Single Blog Details
exports.getBlogIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Fetch single blog",
      blog,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting Single blog!",
      error,
    });
  }
};
// remove blog
exports.deleteBlogController = async (req, res) => {
  try {
    // passing id without destructuring
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user') // those model that add with this model as relationship we can change those also by using populate method 

    await blog.user.blogs.pull(blog) // simply first get the 'user' inside we have 'blogs' then  with the help of 'blog' then pull out the blog from blogModel.
    await blog.user.save()  // then save the blogModel again

    return res.status(200).send({ 
      success: true,
      message: "Blog Deleted!"
    })
    
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleteing!",
      error
    })
  }

};
// get user blog
exports.userController = async (req, res) => {
  try {
   const userBlog = await userModel.findById(req.params.id).populate('blogs')
  // as soon we get user id we will just show the user blogs using populate method
  if(!userBlog){
    return res.status(404).send({
      success: false,
      message: "Blogs not found!!",
    })
  }

  return res.status(200).send({
    success: true,
    message: "user Blogs",
    userBlog
  })
  
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while geting user blog!",
      error
    })
  }

};
