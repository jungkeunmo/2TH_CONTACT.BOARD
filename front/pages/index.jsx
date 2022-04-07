import React, {useEffect, useState, useRef, useCallback} from "react";
import styled from "styled-components";
import Typist from "react-typist";
import {Table, Modal, Button, Form, Input, message} from "antd";
import axios from "axios";

const Whole = styled.section`
    width: 100%;
    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid #999;
    box-shadow: 3px 3px 9px #999;
    border-radius: 6px;

    background-color: #eee;
`;

const Wrapper = styled.section`
    width: 100%;
    height: ${(props) => props.height || "100%"};
    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.al  || "center"};
    justify-content: ${(props) => props.ju  || "center"};

    margin-top: ${(props) => props.mt || 0}px;
`;

const TitleText = styled.h2`
    position: relative;

    &:before {
        content: "WEB|APP Developer";

        position: absolute;

        right: -25px;
        bottom: -10px;

        font-size: 12px;

        background-color: blue;
        color: #fff;

        padding: 1px 5px;
        border-radius: 5px;

        box-shadow: 3px 3px 3px #999;
        text-shadow: 2px 2px 2px #999;

        transform: rotate(-7deg);
    }
`;

const SubText = styled.p`
    color: #444;
    font-size: 15px;

    margin-top: 40px;
`;


const MyTable = styled(Table)`
    width: 100%;
`;

const _D_title = styled.div `
    margin: 10px 0px 30px 0px;
    font-size: 18px;
    padding: 0px 3px;
    border-bottom: 4px solid #d7d7d7;
`;
const _D_author = styled.div `
    margin: 5px 0px 5px 0px;
    font-size: 14px;
    color: #999;
`;

const _D_createdAt = styled.div `
    margin: 5px 0px 5px 0px;
    font-size: 14px;
    color: #999;
`;

const _D_content = styled.div `
    width: 100%;
    height: 50vh;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #d7d7d7;
    margin-top: 20px;
    overflow: scroll;
`;

const _D_deletBtn = styled.button`
    margin-top: 20px;

    width: 120px;
    height: 27px;
    outline: none;
    border: none;
    background-color: red;
    color: #fff;
    border-radius: 7px;
    margin: 5px;

    cursor: pointer;

    transition: 0.5s;
    &:hover {
        background-color: #fff;
        color: red;
    }
`;

const _D_UpdateBtn = styled.button`
    margin-top: 20px;
    margin-left: 10px;

    width: 120px;
    height: 27px;
    outline: none;
    border: none;
    background-color: skyblue;
    color: #fff;
    border-radius: 7px;

    cursor: pointer;

    transition: 0.5s;
    &:hover {
        background-color: #fff;
        color: skyblue;
    }
`;

const WriteTextArea = styled(Input.TextArea)`
   resize: none;
`;


const MyWeb = () => {
    const [boardList, setBoardList] = useState();
    const [detailModal, setDetailModal] = useState(false);
    const [writModal, writeModal] = useState(false);
    const [deleteModal, DeleteModal] = useState(false);
    const [deletModalCheck, DeleteModalCheck] = useState(false);

    const [selectId, SelectId] = useState("");
    const [deleteId, DeleteId] = useState("");
    const [dTitle, setDTitle] = useState("");
    const [dAuthor, setDAuthor] = useState("");
    const [dCreatedAt, setDCreatedAt] = useState("");
    const [dContent, setDContent] = useState("");
    const [dPass, setDPass] = useState(null);
    const [dcPass, setdcPass] = useState(null);

    const writeForm = useRef();
    const deleteForm = useRef();
    const deleteCheckForm = useRef();



    const getList = async() => {
        const result = await axios.get("http://localhost:4000/api/list");

        setBoardList(result.data)
    }

    const writeModalToggle =  () => {
        writeModal((prev) => !prev);
    };

    const DeleteModalToggle =  () => {
        DeleteModal((prev) => !prev);
    };

    const DeleteCheckToggle = () => {
        DeleteModalCheck((prev) => !prev);
    };

    const detailModalToggle = () => {
        setDetailModal((prev) => !prev);
    };
    
    useEffect(() => {
        getList();
    }, []);

    const titleClickHandler = (data) => {
        
        SelectId(data.id);
        DeleteId(data.id);
        setDTitle(data.title);
        setDAuthor(data.author);
        setDCreatedAt(data.formatCreatedAt);
        setDContent(data.content);
        setDPass(data.pass);
        setdcPass(data.pass);
        
        detailModalToggle(); 
    }

    const columns = [
        {
            title : "No.",
            dataIndex : "id"
        },
        {
            title : "Title",
            render : (data) => <div onClick={() => titleClickHandler(data)}>{data.title}</div>, 
        },
        {
            title : "Author",
            dataIndex : "author"
        },
        {
            title : "CreatedAt",
            dataIndex : "formatCreatedAt"
        },
        {
            title : "Hit",
            dataIndex : "hit"
        },
    ]

    const writeFormHandler = async(fd) => {
        const result = await axios.post("http://localhost:4000/api/write", fd);

        if(result.status === 201) {
           
            // 모달창 닫기
            // 모달안에 데이터 초기화
            // 데이터 불러오기

            message.success("새로운 게시글이 등록되었습니다.");
            writeModalToggle();
            writeForm.current.resetFields();
            getList();
        } else {
            message.error("게시글 등록실패");
        }
    };

    const deleteHandler = async () => {
        const result = await axios.post("http://localhost:4000/api/delete", {
            selectId,
        });

        if(result.status === 200) {
            message.success("새로운 게시글이 삭제되었습니다.");
            getList();
        } else {
            message.error("게시글 삭제실패");
        }
    };

    const deleteIdHandler = async () => {
        const result = await axios.post("http://localhost:4000/api/deleteCheck", {
            deleteId
        });

        if(result.status === 200) {
            message.success("게시글이 성공적으로 삭제되었습니다.");
            getList();
        } else {
            message.error("게시글 작성을 실패 했습니다.");
        };
    };

    const deleteHandlerCheck = useCallback((data) => {
        const realPass = "" + dPass;
        const comparePass = "" + data.pass;

        if (realPass === comparePass) {
            message.success("비밀번호가 일치 하였습니다.");
            deleteForm.current.resetFields();
            DeleteModalToggle();
            detailModalToggle();
            deleteHandler();
        } else {
            message.error("비밀번호가 일치 하지 않습니다.");
            deleteForm.current.resetFields();
            return;
        }
    }, [deleteForm.current, dPass]);

    const deletecheckHandler = useCallback((data) => {
        const dcrealPass = "" + dcPass;
        const dccomparePass = "" + data.pass;

        if (dcrealPass === dccomparePass) {
            deleteCheckForm.current.resetFields();
            DeleteCheckToggle();
            detailModalToggle();
            deleteIdHandler();
        } else {
            message.error("비밀번호가 일치 하지 않습니다.");
            deleteCheckForm.current.resetFields();
            return;
        }
    }, [deleteCheckForm.current, dcPass]);

    return (
        <Whole>
            {/* TITLE */}
            <Wrapper height="130px">
                <TitleText>Talk To Developer JGM</TitleText>

                <Typist cursor={{
                    show: false,
                }}>
                <SubText>저에게 전고 싶은 말이 있으신가요? 게시글을 작성해주세요.</SubText>
                </Typist>
            </Wrapper>

            {/* BOARD */}
            <Wrapper al="flex-end">
                <Button type="primary" size="small" onClick={() => writeModalToggle()}>글작성하기</Button>
            </Wrapper>

            <Wrapper mt="25">
                <MyTable rowKey="id" columns={columns} dataSource={boardList} size="small" />
            </Wrapper>

            {/*DETAIL MODAL */}
            <Modal footer={null} visible={detailModal} onCancel={() => detailModalToggle()} title="게시글 상세보기" width="100%">
                <_D_title>{dTitle}</_D_title>
                <_D_author>{dAuthor}</_D_author>
                <_D_createdAt>{dCreatedAt}</_D_createdAt>
                <_D_content>{dContent}</_D_content>
                <_D_deletBtn onClick={() => DeleteModalToggle()}>삭제1</_D_deletBtn>
                <_D_deletBtn onClick={() => DeleteCheckToggle()}>삭제2</_D_deletBtn>
                <_D_UpdateBtn>수정</_D_UpdateBtn>
            </Modal>    
            {/*DETAIL MODAL */}    

            {/*WRITE MODAR */}
            <Modal footer={null} visible={writModal} onCancel={() => writeModalToggle()} title="게시글 작성하기" width="100%">
                <Form ref={writeForm} wrapperCol={{span : 22}} labelCol={{span : 2}} onFinish={writeFormHandler}>
                    <Form.Item label="제목" name="title" rules={[
                        {
                            required : true,
                            message : "제목은 필수입력 사항입니다.",
                        },
                    ]}>
                        <Input allowClear/>
                    </Form.Item>

                    <Form.Item label="작성자" name="author" rules={[
                        {
                            required : true,
                            message : "작성은 필수입력 사항입니다.",
                        },
                    ]}>
                        <Input allowClear/>
                    </Form.Item>

                    <Form.Item label="비밀번호" name="pass" rules={[
                        {
                            required : true,
                            message : "비밀번호는 필수입력 사항입니다.",
                        },
                    ]}>
                        <Input type="password" allowClear maxLength={4} />
                    </Form.Item>

                    <Form.Item label="내용" name="content" rules={[
                        {
                            required : true,
                            message : "내용은 필수입력 사항입니다.",
                        },
                    ]}>
                        <WriteTextArea allowClear rows={10}/>
                    </Form.Item>
                    
                    <Wrapper al="flex-end">
                        <Button  type="primary" htmlType="submit">
                            작성
                        </Button>
                    </Wrapper>
                </Form>
            </Modal>    
            {/*WRITE MODAR */}    

            {/*DELETE MODAR */}
             <Modal footer={null} visible={deleteModal} onCancel={() => DeleteModalToggle()} title="비밀번호" width="50%">
                <Form ref={deleteForm} wrapperCol={{span : 15}} labelCol={{span : 5}} onFinish={deleteHandlerCheck}>
                    <Form.Item label="비밀번호" name="pass" rules={[
                        {
                            required : true,
                            message : "비밀번호는 필수입력 사항입니다.",
                        },
                    ]}>
                        <Input type="password" allowClear maxLength={4} />
                    </Form.Item>
                    
                    <Wrapper al="flex-center">
                        <Button  type="danger" htmlType="submit">
                            확인
                        </Button>
                    </Wrapper>
                </Form>
            </Modal>        
            {/*DELETE MODAR */}   

            <Modal footer={null} visible={deletModalCheck} onCancel={() => DeleteCheckToggle()} title="비번" width="300px">
                <Form ref={deleteCheckForm} onFinish={deletecheckHandler}>
                    <Form.Item label="비번" name="pass" rules={[
                        {
                            required : true,
                        }
                    ]}>
                        <Input type="password"/>
                    </Form.Item>
                    <Wrapper al="flex-end">
                        <Button type="primary" htmlType="submit">
                            완전 삭제
                        </Button>
                    </Wrapper>    
                </Form>
            </Modal> 
        </Whole>
    )
}

export default MyWeb;