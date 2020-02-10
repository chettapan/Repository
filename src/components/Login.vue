<template>

	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title">
					<span class="login100-form-title-1">
						Sign In
					</span>
				</div>

				<form class="login100-form validate-form" v-on:submit.prevent="login">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span class="label-input100">Email Address</span>
						<input class="input100" type="text" v-model="email" name="email"  placeholder="Enter email">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" v-model="password" name="password" placeholder="Enter password">
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="#" class="txt1">
								Forgot Password?
							</a>
						</div>
					</div>

					<div class="form-row">
					
							 <button class="login100-form-btn" type="submit">Login</button>							 
						

						 <!-- <button class="login101-form-btn">Register</button> -->
						 <!-- <router-link :to="{name: 'Register'}">
							 <button class="login101-form-btn">Register</button>							 
						 </router-link> -->
					</div>	
					
				</form>

							
			</div>
		</div>
	</div>

</template>

<script>
// eslint-disable-next-line
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:5000/users/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('usertoken', res.data)
        this.email = ''
        this.password = ''
        router.push({ name: 'Profile' })
      }).catch(err => {
          // eslint-disable-next-line
        console.log(err)
      })
      this.emitMethod()
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
