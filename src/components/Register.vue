<template>

<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title">
					<span class="login100-form-title-1">
						Create an Account
					</span>
				</div>

				<form class="login100-form validate-form" v-on:submit.prevent="register">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span class="label-input100">First Name</span>
						<input class="input100" v-model="first_name" type="text" name="first_name" placeholder="Enter First Name">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Email is required">
						<span class="label-input100">Last Name</span>
						<input class="input100" v-model="last_name" type="text" name="last_name" placeholder="Enter Last Name">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span class="label-input100">Email Address</span>
						<input class="input100" v-model="email" type="email" name="email" placeholder="Enter email">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" v-model="password" type="password" name="password" placeholder="Enter Password">
						<span class="focus-input100"></span>
					</div>
					<div class="form-row">
						<!-- <button class="login100-form-btn">
							Login
						</button> -->
						<!-- <router-link :to="{name: 'home'}">
							 <button class="login100-form-btn">Login</button>							 
						 </router-link> -->

						 <button class="login101-form-btn" type="submit">Register</button>
					</div>					
				</form>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:5000/users/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }).then(res => {
		  // eslint-disable-next-line
		  console.log(res)
        router.push({ name: 'Login' })
      }).catch(err => {
		  // eslint-disable-next-line
        console.log(err)
      })
    }
  }
}
// eslint-disable-next-line
</script>