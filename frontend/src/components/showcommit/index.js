import React, { useState } from "react";
import { Button, Box, Collapse } from "@chakra-ui/react";

function PostComments({ post }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComments = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={toggleComments}>Show Comments</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="20px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          {post.comments.map((comment) => (
            <p key={comment._id} className="comment">
              {comment.comment}
            </p>
          ))}
        </Box>
      </Collapse>
    </div>
  );
}

export default PostComments;
