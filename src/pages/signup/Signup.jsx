import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/api";
import { Container } from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const shcema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주세요"),
    password: yup.string().min(8).required("비밀번호를 입력해주세요"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
      .required(),
    displayName: yup.string().required("이름을 입력해주세요"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shcema),
  });

  const onSubmit = async (data) => {
    const { email, password, displayName, profileImg } = data;

    // let profileImgBase64 = null;

    // const toBase64 = (profileImg) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(profileImg);
    //   reader.addEventListener("load", async (e) => {
    //     profileImgBase64 = e.target.result;
    //     console.log(profileImgBase64);
    //   });
    // };

    // toBase64(profileImg[0]);

    try {
      const res = await instance.request("/auth/signup", {
        method: "post",
        data: {
          email,
          password,
          displayName,
          // profileImgBase64,
        },
      });
      console.log(res);
      console.log(res.data);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }

    // console.log(profileImgBase64);
    console.log(data);
  };

  return (
    <section>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" {...register("profileImg")} />
          <input type="text" placeholder="이메일" {...register("email")} />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            {...register("confirmPassword")}
          />

          <div>
            <label htmlFor="username">이름</label>
            <input
              type="text"
              id="username"
              placeholder="이름을 입력하세요"
              {...register("displayName")}
            />
          </div>

          <input type="submit" value="가입하기" />
        </form>
      </Container>
    </section>
  );
};
export default Signup;
