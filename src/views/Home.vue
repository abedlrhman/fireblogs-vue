<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogsPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Fireblogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost"
import BlogCard from "../components/BlogCard"
import Arrow from "../assets/Icons/arrow-right-light.svg"
export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCard,
    // svgs
    Arrow,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "weekly blog articles width app things programming including HTML, CSS, JavaScript and mire. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding"
      },
      sampleBlogsPost: [
        {
          title: "This is a Filler Title",
          blogHtml: "This is a Filler blog post title!",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Filler Title",
          blogHtml: "This is a Filler blog post title!",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    }
  },
	computed: {
		sampleBlogCards() {
			return this.$store.state.sampleBlogCards
		}
	}
};
</script>

<style scoped>
.blog-card-wrap h3{
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}
.updates .container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.updates .container .router-button{
  display: flex;
  font-size: 14px;
  text-decoration: none;
}
.updates .container h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
@media (min-width: 800px) {
  .updates .container {
    padding: 125px 25px;
    flex-direction: row;
  }
  .updates .container .router-button {
    margin-left: auto;
  }
  .updates .container h2 {
    text-align: initial;
    font-size: 40px;
  }
}
</style>