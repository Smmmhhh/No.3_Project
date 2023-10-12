import "./Register.css";

const Register = () => {
  return (
    <div className="register">
      <div className="top_logo">
        <img src="/assets/logo.png" />
      </div>
      <div className="register_input">
        <section className="register_left">
          <form className="register_form">
            <label for="id">아이디</label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="5~20자"
              minLength={5}
              maxLength={20}
              required
            />
            <label for="name">이름</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="2~10자"
              required
            />
            <label for="pwd">비밀번호</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              placeholder="5~20자"
              required
            />
            <label for="checkpwd">비밀번호 확인</label>
            <input
              type="password"
              name="checkpwd"
              id="checkpwd"
              placeholder="5~20자"
              required
            />
            <label for="nickname">닉네임</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="010-xxxx-xxxx"
              required
            />
            <label for="phone">전화번호</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="5~20자"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              required
            />
            <label for="mytown">동네 설정</label>
          </form>
        </section>
        <section className="rgister_right">
          <img src="assets/loginpanda.png" />
        </section>
      </div>
    </div>
  );
};
export default Register;
