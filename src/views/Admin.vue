<template>
	<div class="admin">
		<div class="container">
			<h2>administration</h2>
			<div class="admin-info">
				<h2>Add Admin</h2>
				<div class="input">
					<input type="text" id="addAdmins" v-model="adminEmail" placeholder="Enter user email to make them an admin">
				</div>
				<span>{{ this.functionMsg }}</span>
				<button class="button" >Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Admin",
	data() {
		return {
			adminEmail: "",
			functionMsg: null,
		}
	}
}
</script>

<style scoped>

.admin .container {
	max-width: 1000px;
	padding: 60px 25px;
}

.admin .container h2 {
	text-align: center;
	margin-bottom: 16px;
	font-weight: 300;
	font-size: 32px;
}

.admin .container .admin-info {
	border-radius: 8px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0,06);
	padding: 32px;
	background-color: #f1f1f1;
	display: flex;
	flex-direction: column;
	max-width: 600px;
	margin: 32px auto;
}

.container .admin-info .input {
	margin: 16px 0;
}

.admin .container .admin-info .input span {
	font-size: 14px;
}

.container .admin-info .input label {
	font-size: 14px;
	display: block;
	padding-bottom: 6px;
}

.container .admin-info .input input {
	width: 100%;
	border: none;
	background-color: #f9f9f9;
	padding: 8px;
	height: 50px;
}

.container .admin-info input:focus {
	outline: none;
}

.container .admin-info button {
	align-self: center;
}

</style>