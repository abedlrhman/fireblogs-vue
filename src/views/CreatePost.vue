<template>
	<div class="create-post">
		<BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
		<Loading v-show="loading" />
		<div class="container">
			<div :class="{invisible: !error}" class="err-message">
				<p><span>Error:</span> {{errorMsg}}</p>
			</div>
			<div class="blog-info">
				<input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
				<div class="upload-file">
					<label for="blog-photo">Upload Cover Photo</label>
					<input type="file" ref="blogPhoto" @change="fileChange" id="blog-photo" accept=".png, .jpg, .jpeg">
					<button @click="openPreview" class="preview" :class="{'button-inactive' : !this.$store.state.blogPhotoFileURL}">Preview Photo</button>
					<span>File Chosen: {{this.$store.state.blogPhotoName}}</span>
				</div>
			</div>
			<div class="editor">
				<vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
			</div>
			<div class="blog-actions">
				<button @click="uploadBlog">Publish Blog</button>
				<router-link :to="{name: 'BlogPreview'}" class="router-button">Post Preview</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit"
import "firebase/storage";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
	name: "CreatePost",
	data() {
		return {
			file: null,
			error: null,
			errorMsg: null,
			loading: null,
			editorSettings: {
				modules: {
					imageResize: {},
				},
			},
		}
	},
	computed: {
		profileId () {
			return this.$store.state.profileId;
		},
		blogCoverPhotoName() {
			return this.$store.state.blogPhotoName;
		},
		blogTitle: {
			get () {
				return this.$store.state.blogTitle;
			},
			set(payload) {
				this.$store.commit("updateBlogTitle", payload);
			}
		},
		blogHTML: {
			get () {
				return this.$store.state.blogHTML;
			},
			set(payload) {
				this.$store.commit("newBlogPost", payload);
			}
		},
	},
	components: {
		BlogCoverPreview,
		Loading,
	},
	methods: {
		fileChange () {
			this.file = this.$refs.blogPhoto.files[0];
			const fileName = this.file.name
			this.$store.commit("fileNameChange", fileName)
			this.$store.commit("createFileURL", URL.createObjectURL(this.file))
		},
		openPreview() {
			this.$store.commit("openPhotoPreview")
		},
		imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
		uploadBlog() {
			if(this.blogTitle.length !== 0 && this.blogHTML !== 0) {
				if(this.file) {
					this.loading = true;
					const storageRef = firebase.storage().ref();
					const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
					docRef.put(this.file).on("state_changed", (snapshot) => {
						console.log(snapshot)
					}, (err) => {
						console.log(err)
						this.loading = false;
					}, async () => {
						const downloadURL = await docRef.getDownloadURL();
						const timestamp = await Date.now();
						const dataBase = await db.collection("blogPosts").doc();
						await dataBase.set({
							blogID : dataBase.id,
							blogHTML : this.blogHTML,
							blogCoverPhoto: downloadURL,
							blogCoverPhotoName: this.blogCoverPhotoName,
							blogTitle: this.blogTitle,
							profileId: this.profileId,
							date: timestamp,
						});
						await this.$store.dispatch("getPost");
						this.loading = false;
						this.$router.push({name: "ViewBlog", params: {blogid: dataBase.id}});
					}
				);
					return;
				}
				this.error = true;
				this.errorMsg = "please ensure you uploaded cover photo!";
				setTimeout(() => {
					this.error = false;
					this.errorMsg = "";
				}, 5000)
				return;
			}
			this.error = true;
			this.errorMsg = "please ensure Blog Title & blog Post has been filled!";
			setTimeout(() => {
				this.error = false;
				this.errorMsg = "";
			}, 5000)
			return;
		},
	},
}
</script>

<style>

.create-post {
	position: relative;
	height: 100%;
}

.create-post button {
	margin-top: 0;

}

.create-post .router-button {
	text-decoration: none;
	color: #fff;
}

.create-post label,
.create-post button,
.create-post .router-button {
	transition: all .5s ease-in-out;
	align-self: center;
	font-size: 14px;
	cursor: pointer;
	border-radius: 20px;
	padding: 12px 24px;
	color: #fff;
	background-color: #303030;
	text-decoration: none;
}

.create-post label:focus,
.create-post button:hover,
.create-post .router-button:focus {
	background-color: rgba(48, 48, 48, .7);
}

.create-post .container {
	position: relative;
	height: 100%;
	padding: 10px 25px 60px;
}

/* error styling */

.create-post .invisible {
	opacity: 0 !important;
}

.create-post .err-message {
	width: 100%;
	padding: 12px;
	border-radius: 8px;
	color: #fff;
	margin-bottom: 10px;
	background-color: #303030;
	opacity: 1;
	transition: .5s ease all;
}

.create-post .err-message  p {
	font-size: 14px;
}

.create-post .err-message  span {
	font-weight: 600;
}

.create-post .blog-info {
	display: flex;
	margin-bottom: 32px;
}

.create-post .blog-info input:nth-child(1) {
	min-width: 300px;
}

.create-post .blog-info input {
	transition: .5s ease-in-out all;
	padding: 10px 4px;
	border: none;
	border-bottom: 1px solid #303030;
}

.create-post .blog-info input:focus {
	outline: none;
	box-shadow: 0 1px 0 0 #303030;
}

.create-post .blog-info .upload-file {
	flex: 1;
	margin-left: 16px;
	position: relative;
	display: flex;
}

.create-post .blog-info .upload-file input {
	display: none;
}

.create-post .blog-info .upload-file .preview {
	margin-left: 16px;
	text-transform: initial;
}

.create-post .blog-info .upload-file span {
	font-size: 12px;
	margin-left: 16px;
	align-self: center;
}

.create-post .editor {
	height: 60vh;
	display: flex;
	flex-direction: column;
}

.create-post .editor .quillWrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 90%;
}

.create-post .editor .ql-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.create-post .editor .ql-editor {
	padding: 20px 16px 30px;
}

.create-post .blog-actions {
	margin-top: 32px;
}

.create-post .blog-actions button {
	margin-right: 16px;
}

</style>