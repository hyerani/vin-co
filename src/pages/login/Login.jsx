import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./styles";
import { instance } from "../../api/api";

const Login = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주세요"),
    password: yup.string().min(8).required("비밀번호를 입력해주세요"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const res = await instance.request("/auth/login", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...data,
        },
      });

      const { displayName, email, profileImg } = res.data;

      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section
      style={{
        padding: "1rem 0.75rem",
        marginTop: "130px",
      }}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="이메일" {...register("email")} />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          <button type="submit">로그인</button>
        </Form>

        <button type="button">
          <Link to="/signup">회원가입 </Link>
        </button>
      </Container>
    </section>
  );
};
export default Login;
