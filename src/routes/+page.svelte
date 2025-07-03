<script>
import image from "$lib/image/rrcm logo.svg";
</script>
   
<main>

<div class="login-box">
    <img src={image} alt="Logo">
    <h2> Welcome to the Login Page</h2>
    <form>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Enter your username" required>

      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>

      <label for="role">Select Role</label>
      <select id="role" name="role" required>
        <option value="student">Student</option>
        <option value="staff">Staff</option>
        <option value="faculty">Faculty</option>
      </select>

      <button type="submit">Log In</button>
    </form>
  </div>
</main> 
  
  <style>

main {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #005A9C, #00A99D, #FFF6A3, #407A52);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-box {
      background-color: rgba(255, 255, 255, 0.95);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
      max-width: 420px;
      width: 100%;
      animation: slideUp 1.2s ease-out forwards;
    }

    .login-box img {
      display: block;
      margin: 0 auto 20px auto;
      max-width: 120px;
      height: auto;
    }

    .login-box h2 {
      margin-bottom: 20px;
      color: black;
      text-align: center;
      animation: slideUp 1.5s ease-out forwards;
      font-weight: bolder;
    }

    .login-box label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .login-box input,
    .login-box select {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    .login-box button {
      background-color: #00A99D;
      color: white;
      border: none;
      padding: 12px;
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    }

    .login-box button:hover {
      background-color: #407A52;
      transform: scale(1.02);
    }
  </style>
