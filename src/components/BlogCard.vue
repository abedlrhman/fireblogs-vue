<template>
	<div class="blog-card">
		<div class="icons" v-show="editPost">
			<div class="icon">
				<Edit class="edit" />
			</div>
			<div class="icon">
				<Delete class="delete" />
			</div>
		</div>
		<img :src="post.blogCoverPhoto" alt="">
		<div class="info">
			<h4>{{post.blogTitle}}</h4>
			<h6>Posted on: {{ new Date(post.blogDate).toLocaleString('en-us', {dateStyle: 'long'}) }}</h6>
			<router-link class="link" :to="{ name: 'ViewBlog', params: {blogid: this.post.blogID} }">
				View The Post <Arrow class="arrow" />
			</router-link>
		</div>
	</div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import Edit from "../assets/Icons/edit-regular.svg"
import Delete from "../assets/Icons/trash-regular.svg"
export default {
	name: "blogCard",
	props: {
		post: Object,
	},
	components: {
		Arrow,
		Edit,
		Delete,
	},
	computed: {
		editPost () {
			return this.$store.state.editPosts;
		}
	},
	beforeDestroy() {
		this.$store.commit("toggleEditPost", false)
	},
}
</script>

<style scoped>

.blog-card {
	position: relative;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	background-color: #fff;
	min-height: 420px;
	transition: all .5s ease;
}
.blog-card:hover {
	transform: rotateZ(-1deg) scale(1.01);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
}
.icons {
	display: flex;
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 99;
}
.icons .icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	background-color: #fff;
	transition: all .5s ease
}

.icons .icon:hover {
	background-color: #303030;
}
.icons .icon:hover .edit path ,
.icons .icon:hover .delete path{
	fill: #fff;
}

.icon:nth-child(1) {
	margin-right: 8px;
}
.edit,
.delete {
	pointer-events: none;
	height: 15px;
	width: auto;
}

img {
	display: block;
	border-radius: 8px 8px 0 0;
	z-index: 1;
	width: 100%;
	min-height: 200px;
	object-fit: cover;
}

.info {
	display: flex;
	flex-direction: column;
	height: 100%;
	z-index: 3;
	padding: 32px 16px;
	color: #000;
}
.info h4 {
	padding-bottom: 8px;
	font-size: 20px;
	font-weight: 300;
}

.info h6 {
	font-weight: 400;
	font-size: 12px;
	padding-bottom: 16px;
}

.info .link {
	display: inline-flex;
	align-items:center;
	margin-top: auto;
	font-weight: 500;
	padding-top: 20px;
	font-size: 12px;
	padding-bottom: 4px;
	transition: all 0.5s ease-in
}

.info .link:hover {
	color: rgba(48, 48, 48, .8);
}

.info .link .arrow {
	width: 10px;
}

</style>