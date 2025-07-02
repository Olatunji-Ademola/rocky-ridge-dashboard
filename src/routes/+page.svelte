<script>
    import LogoImage from "$lib/image/Logo.png";
</script>
  <style>
    *:focus{
        border: solid 2px #3c7183;
    }
    main {
      font-family: Arial, sans-serif;
      background: whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
    }

    .login-container {
      background-color: white;
      /* padding: 30px; */
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 300px;
    }
    .login-wrap{
        padding: 30px;
    }
    .login-container h2 {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bolder;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"],
    select {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border: solid 2px  #3c7183;
      border-radius: 5px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #3c7183;
      color: white;
      border: none;
      /* border-radius: 5px; */
      cursor: pointer;
    }

    button:hover {
      background-color: #43686c;
    }
  </style>
<main>

  <div class="login-container">
    
    
    <form action="/login" method="POST">
        <div class="login-wrap"> 
        <img src={LogoImage} alt="Rocky Ridge Logo"/>
        <h2>LOGIN PORTAL</h2>
      <div class="form-group">
        <!-- <label for="username">Username:</label> -->
        <input type="text" id="username" name="username" placeholder="enter your email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" required />
      </div>

      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="faculty">Faculty</option>
        </select>
      </div>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>

</main>

