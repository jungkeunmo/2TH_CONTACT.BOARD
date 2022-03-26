import React from "react";
import styled from "styled-components";
import Typist from "react-typist";
import {Table} from "antd";

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
    align-items: center;
    justify-content: center;

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

const MyWeb = () => {

    const columns = [
        {
            title : "No.",
            dataIndex : "id"
        },
        {
            title : "Title",
            dataIndex : "title"
        },
        {
            title : "Author",
            dataIndex : "author"
        },
        {
            title : "CreatedAt",
            dataIndex : "createdAt"
        },
        {
            title : "Hit",
            dataIndex : "hit"
        },
    ]

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
            <Wrapper mt="100">
                <MyTable rowKey="id" columns={columns} dataSource={[]} size="small" />
            </Wrapper>
        </Whole>
    )
}

export default MyWeb;