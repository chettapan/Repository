<template>
	<div id="app1">
		<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Username: {{ username }}</p>
			<p class="online">Online: {{ users.length }}</p>
			<p class="online">Online: {{ users }}</p>

		</div>

		<ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
	</div>
</template>

<script>
import io from 'socket.io-client';
import ChatRoom from './Chatroom';
import jwtDecode from 'jwt-decode';


export default {
	name: 'app',
	components: {
		ChatRoom
	},
	data: function () {
        const token = localStorage.usertoken
        const decoded = jwtDecode(token)

		return {
            userdata: localStorage.getItem("usertoken"),
            username: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
			socket: io("http://localhost:3000"),
			messages: [],
			users: []
		}
	},
	methods: {
		joinServer: function () {
            
				this.socket.emit('newuser', this.username);
			},

		sendMessage: function (message) {
			this.socket.emit('msg', message);
		}
	},
	mounted: function () {
        
		this.socket.on('loggedIn', data => {
			// eslint-disable-next-line
			console.log('loggedIn',data.username)
			this.messages = data.messages;
			this.users = data.users;
		});

		this.joinServer();

		this.socket.on('userOnline', user => {
				// eslint-disable-next-line
				console.log('userOnline')
				this.users.push(user);
		});

		this.socket.on('userLeft', user => {
				// eslint-disable-next-line
				console.log('userLeft')
				this.users.splice(this.users.indexOf(user), 1);
		});
		this.socket.on('msg', message => {
				// eslint-disable-next-line
				console.log('msg')
				this.messages.push(message);
		});
	
	}
	 
}
</script>

<style lang="scss">
// body {
// 	font-family: 'Avenir', Helvetica, Arial, sans-serif;
// 	color: #2C3E50;
// 	margin: 0;
// 	padding: 0;
// }

#app1 {
	display: flex;
	flex-direction: column;
	height: 97vh;
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}
</style>
