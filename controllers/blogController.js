import express from "express";
const router = express.Router();
import BlogPost from "../models/BlogPost.js";
import { authenticate, authorize } from "../middleware/auth.js";

// Create a new blog post (only admins and editors can create posts)
router.post("/",authenticate, authorize(["admin","editor"]), async (req, res) => {
  const blogPost = new BlogPost(req.body);
  blogPost
    .save()
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

// Get all blog posts (all roles can view posts)
router.get("/", authenticate, authorize(["admin","viewer","editor"]),(req, res) => {
  BlogPost.find().then((posts) => {
    res.send(posts);
  });
});

// Get a single blog post (all roles can view posts)
router.get("/:id",authenticate, authorize(["admin","viewer","editor"]), (req, res) => {
  BlogPost.findById(Object(req.params.id)).then((post) => {
    if (!post) {
      res.status(404).send({ message: "Post not found" });
    } else {
      res.send(post);
    }
  });
});

// Update a single blog post (only admins and editors can update posts)
router.put("/:id",authenticate, authorize(["admin","editor"]), (req, res) => {
  console.log(req.params.id);
  BlogPost.findByIdAndUpdate(Object(req.params.id), req.body)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err);
    });
});

// Delete a single blog post (only admins can delete posts)
router.delete("/:id",authenticate, authorize(["admin","editor"]), (req, res) => {
  BlogPost.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
