const { buildSchema } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The user and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an user. That said an user has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to user.
  type User {
    username: String,
    first_name: String,
    last_name: String,
    password_hash: String,
    profilePicture: String
  }

  type Post {
    post_id: Int,
    text: String,
    username: String,
    postPicture: String,
    likes: Int,
    dislikes: Int
  }

  type Comment {
    comment_id: Int,
    comment_text: String,
    username: String
  }

  type Follow {
    follow_id: Int,
    followingUsername: String
  }

  # The input type can be used for incoming data.
  input userInput {
    username: String,
    first_name: String,
    last_name: String,
    password: String
  }

  input postInput {
    post_id: Int,
    text: String,
    postPicture: String
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    all_posts: [Post],
    user(username: String): User,
    post(username: String): Post
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    update_user(input: userInput): User,
    delete_user(username: String): Boolean,
    update_post(input: postInput): Post
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  user: async (args) => {
    return await db.user.findByPk(args.username);
  },
  all_posts: async() =>{
    return await db.post.findAll();
  },
  post: async (args) => {
    return await db.post.findByPk(args.post_id);
  },

  // Mutations.
  update_user: async (args) => {
    const user = await db.user.findByPk(args.input.username);
    const hash = await argon2.hash(args.input.password, { type: argon2.argon2id });
  
    // Update user fields.
    user.first_name = args.input.first_name;
    user.last_name = args.input.last_name;
    user.password_hash = hash;

    await user.save();

    return user;
  },
  delete_user: async (args) => {
    const user = await db.user.findByPk(args.username);
  
    if(user === null)
      return false;

    // First remove all posts by the user.
    await db.post.destroy({ where: { username: user.username } });
    await user.destroy();

    return true;
  },
  update_post: async (args) => {
    const post = await db.post.findByPk(args.input.post_id);

    post.text = args.input.text;
    post.postPicture = args.input.postPicture;

    await db.comment.destroy({ where: { post_id: args.input.post_id } });
    await post.save();

    return post;
  }
};

module.exports = graphql;

// Below are some sample queries that can be used to test GraphQL in GraphiQL.
// Access the GraphiQL web-interface when the server is running here: http://localhost:4000/graphql
/*

{
  all_users {
    email,
    first_name,
    last_name,
    pets {
      pet_id,
    	name
    }
  }
}

{
  user(email: "matthew@rmit.edu.au") {
    email,
    first_name,
    last_name
  }
}

{
  user_exists(email: "matthew@rmit.edu.au")
}

mutation {
  create_user(input: {
    email: "newuser@rmit.edu.au",
    first_name: "New",
    last_name: "User"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  update_user(input: {
    email: "matthew@rmit.edu.au",
    first_name: "Matthew",
    last_name: "Bolger"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  delete_user(email: "newuser@rmit.edu.au")
}

*/
