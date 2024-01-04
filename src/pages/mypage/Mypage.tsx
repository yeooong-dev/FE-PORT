import React, { useState, useEffect } from "react";
import UseUser from "../../hook/UseUser";
import Modal from "react-modal";
import {
  Info,
  NameEdit,
  Profile,
  Tab,
  TabContainer,
  TabTop,
  Wrap,
} from "./StMypage";
import { RiEditCircleFill } from "react-icons/ri";
import {
  imgAdd,
  imgGet,
  imgDelete,
  updatePassword,
  deleteAccount,
  updateName,
} from "../../api/mypage";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomAlert from "../../components/alert/CustomAlert";
import CustomConfirm from "../../components/alert/CustomConfirm";
import { useUserContext } from "../../components/navigation/userContext";

function Mypage() {
  Modal.setAppElement("#root");
  const { user, setUser } = UseUser();
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
  const { state, updateUserContext } = useUserContext();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  // 커스텀 알럿
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [showConfirm, setShowConfirm] = useState(false);

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
          <TabContainer darkMode={darkMode}>
            <NameEdit>
              <form onSubmit={handleNameChange}>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='변경할 이름 입력'
                  autoComplete='username'
                />

                <input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='이메일 입력'
                  autoComplete='email'
                />

                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='비밀번호 입력'
                  autoComplete='current-password'
                />
                <button type='submit'>이름 변경</button>
              </form>
            </NameEdit>
          </TabContainer>
        );
      case "pwEdit":
        return (
          <TabContainer darkMode={darkMode}>
            <NameEdit>
              <form onSubmit={handlePasswordChange}>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='이메일 입력'
                  autoComplete='email'
                />
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='변경할 비밀번호 입력'
                  autoComplete='new-password'
                />
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='비밀번호 확인'
                  autoComplete='new-password-cofirm'
                />
                <button type='submit'>비밀번호 변경</button>
              </form>
            </NameEdit>
          </TabContainer>
        );
      case "deleteAccount":
        return (
          <TabContainer darkMode={darkMode}>
            <NameEdit>
              <form onSubmit={handleAccountDelete}>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='비밀번호 입력'
                  autoComplete='current-password'
                  className='lastInput'
                />
                <button type='submit'>회원 탈퇴하기</button>
              </form>
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
        updateUserContext({
          ...state,
          profileImage: response.data.imageUrl,
        });
        setAlertType("success");
        setAlertMessage("프로필 이미지가 업로드되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
        setAlertType("error");
        setAlertMessage("프로필 이미지 업로드에 실패했습니다.");
      }
    } else {
      console.error("Profile image or user ID is not set");
    }
  };

  const handleImageDelete = async () => {
    if (user?.id) {
      try {
        await imgDelete(user.id);
        setCurrentImage(null);
        updateUserContext({
          ...state,
          profileImage: "/default-profile.png",
        });
        setAlertType("success");
        setAlertMessage("프로필 이미지가 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
        setAlertType("error");
        setAlertMessage("이미지 삭제에 실패했습니다.");
      }
    }
  };

  // 이름 변경
  const handleNameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id || !name || !password || !email) {
      setAlertType("error");
      setAlertMessage("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    try {
      await updateName(user.id, name, email, password);
      const updatedUser = { ...user, name: name };
      setUser(updatedUser);
      updateUserContext({
        ...state,
        name: name,
      });
      setAlertType("success");
      setAlertMessage("이름이 성공적으로 변경되었습니다.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("이름 변경에 실패했습니다.");
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setAlertType("error");
      setAlertMessage("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      const response = await updatePassword(
        user.id,
        email,
        newPassword,
        confirmPassword
      );
      setAlertType("success");
      setAlertMessage("비밀번호가 성공적으로 변경되었습니다.");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setAlertType("error");
      setAlertMessage(
        "비밀번호 변경에 실패하였습니다. 정보를 다시 확인해주세요."
      );
    }
  };

  // 계정 삭제
  const handleAccountDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user === null || user === undefined) {
      setAlertType("error");
      setAlertMessage(
        "유저 정보를 불러오는데 실패했습니다. 다시 시도해주세요."
      );
      return;
    }

    if (!password) {
      setAlertType("error");
      setAlertMessage("비밀번호를 입력해주세요.");
      return;
    }

    setShowConfirm(true);
  };

  const confirmAccountDelete = async () => {
    if (!user) {
      setAlertType("error");
      setAlertMessage("유저 정보가 없습니다.");
      return;
    }

    try {
      const response = await deleteAccount(user.id, password);
      setAlertType("success");
      setAlertMessage("계정이 성공적으로 삭제되었습니다.");
      setUser(null);
      navigate("/login");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <Wrap>
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertMessage(null);
            setAlertType("error");
          }}
        />
      )}
      <Profile darkMode={darkMode}>
        {currentImage ? (
          <img src={currentImage} className='p_img' alt='프로필 이미지' />
        ) : (
          <img src='/person.png' className='p_img' alt='프로필 이미지' />
        )}

        <div onClick={openModal} className='icon'>
          <RiEditCircleFill className='edit' size='45' color='#3c57b3' />
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
            zIndex: "999",
          },
          content: {
            width: "80%",
            maxWidth: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: darkMode ? "#333" : "#f6f6f6",
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
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#858087",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontSize: "1.3rem",
            cursor: "pointer",
            color: "white",
          }}
          onClick={closeModal}
        >
          X
        </button>
        <p
          style={{
            fontSize: "1.4rem",
            marginBottom: "30px",
            color: darkMode ? "white" : "black",
          }}
        >
          프로필 사진 변경
        </p>
        <img
          src={currentImage ? currentImage : "/person.png"}
          alt='현재 프로필 이미지'
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            width: "60%",
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
              width: "100%",
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
              width: "100%",
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

      <TabContainer darkMode={darkMode}>
        <TabTop darkMode={darkMode}>
          <Tab
            selected={selectedTab === "nameEdit"}
            onClick={() => setSelectedTab("nameEdit")}
            className='nameEditBtn'
            darkMode={darkMode}
          >
            이름 변경
          </Tab>
          <Tab
            selected={selectedTab === "pwEdit"}
            onClick={() => setSelectedTab("pwEdit")}
            className='passwordEditBtn'
            darkMode={darkMode}
          >
            비밀번호 변경
          </Tab>
          <Tab
            selected={selectedTab === "deleteAccount"}
            onClick={() => setSelectedTab("deleteAccount")}
            className='deleteAccountEditBtn'
            darkMode={darkMode}
          >
            회원 탈퇴
          </Tab>
          {showConfirm && (
            <CustomConfirm
              message='정말로 계정을 삭제하시겠습니까?'
              onConfirm={confirmAccountDelete}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </TabTop>

        <Info darkMode={darkMode}>{renderContent()}</Info>
      </TabContainer>
    </Wrap>
  );
}

export default Mypage;
