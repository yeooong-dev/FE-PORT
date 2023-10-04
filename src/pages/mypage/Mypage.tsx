import React, { useState, useEffect } from "react";
import useUser from "../../hook/UseUser";
import Modal from "react-modal";
import { Info, NameEdit, Profile, Tab, TabContainer, TabTop } from "./StMypage";
import { RiEditCircleFill } from "react-icons/ri";
import {
  imgAdd,
  imgGet,
  imgDelete,
  updateName,
  updatePassword,
  deleteAccount,
} from "../../api/mypage";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/navigation/userContext";

function Mypage() {
  Modal.setAppElement("#root");
  const { user, setUser } = useUser();
  const { state, dispatch } = useUserContext();
  const [selectedTab, setSelectedTab] = useState<
    "nameEdit" | "pwEdit" | "deleteAccount" | null
  >("nameEdit");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (user && user.id) {
      (async () => {
        try {
          const response = await imgGet(user.id);
          let imageUrl = response.data.imageUrl;
          if (imageUrl) {
            imageUrl = imageUrl.replace(
              "https://yeong-port.s3.ap-northeast-2.amazonaws.com/",
              ""
            );
            setCurrentImage(
              "https://yeong-port.s3.ap-northeast-2.amazonaws.com/" + imageUrl
            );
          } else {
            setCurrentImage(null);
          }
        } catch (error: any) {
          console.error(error);
          if (error.response && error.response.status === 404) {
            alert(error.response.data.error);
          } else {
            alert(
              "프로필 이미지를 불러오는 데 실패했습니다. 다시 시도해주세요."
            );
          }
        }
      })();
    }
  }, [user]);

  const renderContent = () => {
    switch (selectedTab) {
      case "nameEdit":
        return (
          <TabContainer>
            <NameEdit>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='변경할 이름 입력'
              />

              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일 입력'
              />

              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='비밀번호 입력'
              />
              <button onClick={handleNameChange}>이름 변경</button>
            </NameEdit>
          </TabContainer>
        );
      case "pwEdit":
        return (
          <TabContainer>
            <NameEdit>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일 입력'
              />

              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='변경할 비밀번호 입력'
              />

              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='비밀번호 확인'
              />

              <button onClick={handlePasswordChange}>비밀번호 변경</button>
            </NameEdit>
          </TabContainer>
        );
      case "deleteAccount":
        return (
          <TabContainer>
            <NameEdit>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='비밀번호 입력'
              />
              <br />
              <button onClick={handleAccountDelete}>회원 탈퇴하기</button>
            </NameEdit>
          </TabContainer>
        );
      default:
        return null;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  // 프로필 업로드
  const handleImageUpload = async () => {
    if (profileImage && user?.id) {
      try {
        await imgAdd(user.id, profileImage);
        const response = await imgGet(user.id);
        setCurrentImage(response.data.imageUrl);
        alert("프로필 이미지가 업로드되었습니다.");

        const newImageUrl = response.data.imageUrl;
        dispatch({
          type: "SET_USER",
          payload: { name: state.name, profileImage: newImageUrl },
        });
      } catch (error) {
        console.error(error);
        alert("프로필 이미지 업로드에 실패했습니다.");
      }
    } else {
      console.error("Profile image or user ID is not set");
    }
  };

  // 프로필 삭제
  const handleImageDelete = async () => {
    if (user?.id) {
      try {
        await imgDelete(user.id);
        setCurrentImage(null);
        alert("프로필 이미지가 삭제되었습니다.");
        dispatch({
          type: "SET_USER",
          payload: { name: state.name, profileImage: "" },
        });
      } catch (error) {
        console.error(error);
        alert("이미지 삭제에 실패했습니다.");
      }
    }
  };

  // 이름 변경
  const handleNameChange = async () => {
    if (!user?.id) {
      alert("유저 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      return;
    }
    try {
      await updateName(user.id, name, email, password);
      alert("이름이 성공적으로 변경되었습니다.");
      setUser((prev) => {
        if (prev === null) return null;
        return { ...prev, name };
      });
      setName("");
      setEmail("");
      setPassword("");

      dispatch({
        type: "SET_USER",
        payload: { name: name, profileImage: state.profileImage },
      });
    } catch (error) {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = async () => {
    if (user === null || user === undefined) {
      alert("유저 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      return;
    }

    if (
      !email ||
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword ||
      !email
    ) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      const response = await updatePassword(
        user.id,
        email,
        newPassword,
        confirmPassword
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("비밀번호 변경에 실패하였습니다. 정보를 다시 확인해주세요.");
    }
  };

  // 계정 삭제 핸들러
  const handleAccountDelete = async () => {
    if (user === null || user === undefined) {
      alert("유저 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
      try {
        const response = await deleteAccount(user.id, password);
        alert("계정이 성공적으로 삭제되었습니다.");
        setUser(null);
        navigate("/login");
      } catch (error) {
        alert("비밀번호를 다시 확인해주세요.");
      }
    }
  };

  return (
    <>
      <Profile>
        {currentImage ? (
          <img src={currentImage} className='p_img' alt='프로필 이미지' />
        ) : (
          <img src='/person.png' className='p_img' alt='프로필 이미지' />
        )}

        <div onClick={openModal}>
          <RiEditCircleFill className='edit' size='45' color='#595959' />
        </div>
        <p className='hi'>안녕하세요!</p>
        <p className='name'>{user && user.name ? `${user.name}님` : null}</p>
      </Profile>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "700px",
            height: "600px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f6f6f6",
            border: "none",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "20px",
            fontSize: "1.6rem",
            background: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <p style={{ fontSize: "1.4rem", marginBottom: "30px" }}>
          프로필 사진 변경
        </p>
        <img
          src={currentImage ? currentImage : "/person.png"}
          alt='현재 프로필 이미지'
          style={{
            width: "230px",
            height: "230px",
            borderRadius: "50%",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <label
            htmlFor='fileInput'
            style={{
              display: "inline-block",
              width: "160px",
              height: "40px",
              lineHeight: "40px",
              backgroundColor: "#ebebeb",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            파일 선택
          </label>
          <input
            type='file'
            id='fileInput'
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <button
            onClick={handleImageUpload}
            style={{
              width: "160px",
              height: "40px",
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: "#ccc",
            }}
          >
            프로필 변경
          </button>
        </div>
        <button
          onClick={handleImageDelete}
          style={{
            width: "140px",
            height: "40px",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#ebebeb",
          }}
        >
          이미지 삭제
        </button>
      </Modal>

      <TabContainer>
        <TabTop>
          <Tab
            selected={selectedTab === "nameEdit"}
            onClick={() => setSelectedTab("nameEdit")}
            className='nameEditBtn'
          >
            이름 변경
          </Tab>
          <Tab
            selected={selectedTab === "pwEdit"}
            onClick={() => setSelectedTab("pwEdit")}
            className='passwordEditBtn'
          >
            비밀번호 변경
          </Tab>
          <Tab
            selected={selectedTab === "deleteAccount"}
            onClick={() => setSelectedTab("deleteAccount")}
            className='deleteAccountEditBtn'
          >
            회원 탈퇴
          </Tab>
        </TabTop>

        <Info>{renderContent()}</Info>
      </TabContainer>
    </>
  );
}

export default Mypage;
