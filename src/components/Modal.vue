<template>
	<div class="modal">
		<div class="modal-content">
			<p>{{this.modalMessage}}</p>
			<button @click="closeModal">Close</button>
		</div>
	</div>	
</template>

<script>
export default {
	props: ["modalMessage"],
	methods: {
		closeModal() {
			this.$emit("close-modal")
		},
	}

}
</script>

<style scoped>

.modal {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 101;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, .7);
}

.modal .modal-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 8px;
	width: 300px;
	padding: 40px 30px;
	background-color: #fff;
}
.modal .modal-content p {
	text-align: center;
}
.modal .modal-content button {
	align-self: center;
}

</style>