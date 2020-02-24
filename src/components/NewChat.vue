<template>

<body>
    <div class="containerx clearfix">
        <div class="people-list" id="people-list">
            <div class="search">
                <input type="text" placeholder="search" />
                <i class="fa fa-search"></i>
            </div>
            <ul class="list">
                <li class="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div class="about">
                    <div class="username">{{ username }}</div>
                    <div class="status">
                    <i class="far fa-circle online"></i>😘 online
                    </div>
                </div>
                </li>               
            </ul>            
        </div>
        <div class="chat">
            <div class="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                
                <div class="chat-about">
                    <div class="username">{{ username }}</div>
                    <div class="online">online: {{ users.length }}</div>
                </div>
                <i class="fa fa-star"></i>
            </div> <!-- end chat-header -->
            <NewChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
               
        </div> 
                      
    </div> <!-- end container -->
    
</body>
</template>

<script>
import io from 'socket.io-client';
import NewChatRoom from './NewChatRoom';
import jwtDecode from 'jwt-decode';


export default {
	components: {
		NewChatRoom
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
 


<style lang="scss" scoped>

$green: #86BB71;
$blue: #94C2ED;
$orange: #E38968;
$gray: #92959E;

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background: #C5DDEB;
  font: 14px/20px "Lato", Arial, sans-serif;
  padding: 40px 0;
  color: white;
}

.containerx {
  margin: 0 auto;
  width: 750px;
  background: #444753;
  border-radius: 5px;
}

.people-list {
  width:260px;
  float: left;
  
  .search {
    padding: 20px;
  }
  
  input {
    border-radius: 3px;
    border: none;
    padding: 14px;
    color: white;
    background: #6A6C75;
    width: 90%;
    font-size: 14px;
  }
  
  .fa-search {
    position: relative;
    left: -25px;
  }
  
  ul {
    padding: 20px;
    height: 770px;
 
    
    
    
    li {
      padding-bottom: 20px;
    }
  }
  
  img {
    float: left;
  }
  
  .about {
    float: left;
    margin-top: 8px;
  }
  
  .about {
    padding-left: 8px;
  }
  
  .status {
    color: $gray;
  }
  
}

.chat {
  width: 490px;
  float:left;
  background: #F2F5F8;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  
  color: #434651;
  
  .chat-header {
    padding: 20px;
    border-bottom: 2px solid white;
    
    img {
      float: left;
    }
    
    .chat-about {
      float: left;
      padding-left: 10px;
      margin-top: 6px;
    }
    
    .chat-with {
      font-weight: bold;
      font-size: 16px;
    }
    
    .chat-num-messages {
      color: $gray;
    }
    
    .fa-star {
      float: right;
      color: #D8DADF;
      font-size: 20px;
      margin-top: 12px;
    }
  }
  
  .chat-history {
    padding: 30px 30px 20px;
    border-bottom: 2px solid white;
    overflow-y: scroll;
    height: 575px;
    
    .message-data {
      margin-bottom: 15px;
    }
    
    .message-data-time {
      color: lighten($gray, 8%);
      padding-left: 6px;
    }
    
    .message {      
      color: white;
      padding: 18px 20px;
      line-height: 26px;
      font-size: 16px;
      border-radius: 7px;
      margin-bottom: 30px;
      width: 90%;
      position: relative;
      
      &:after {
        bottom: 100%;
        left: 7%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: $green;
        border-width: 10px;
        margin-left: -10px;
      }
    }
    
    .my-message {
      background: $green;
    }
    
    .other-message {
      background: $blue;
      
      &:after {
        border-bottom-color: $blue;
        left: 93%;
      }
    }
    
  }
  
  .chat-message {
    padding: 30px;
    
    textarea {
      width: 100%;
      border: none;
      padding: 10px 20px;
      font: 14px/22px "Lato", Arial, sans-serif;
      margin-bottom: 10px;
      border-radius: 5px;
      resize: none;
      
    }
    
    .fa-file-o, .fa-file-image-o {
      font-size: 16px;
      color: gray;
      cursor: pointer;
      
    }
    
    button {
      float: right;
      color: $blue;
      font-size: 16px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      font-weight: bold;
      background: #F2F5F8;
      
      &:hover {
        color: darken($blue, 7%);
      }
    }
  }
}

.online, .offline, .me {
    margin-right: 3px;
    font-size: 10px;
  }
  
.online {
  color: $green;
}
  
.offline {
  color: $orange;
}

.me {
  color: $blue;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

.clearfix:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: " ";
	clear: both;
	height: 0;
}


</style>