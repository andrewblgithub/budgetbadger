import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card } from 'grommet';

const ProfileCard = ({userInfo, editing}) => {
  return (
    <div>
    <button onClick={editing}>Edit your profile</button>
      <Box full={true} align="center" pad="large" flex={true}>
        <Card label="User Info" alignSelf="center" style={{ height: "70%", width: "75%", outline: "#000 solid thin" }} >
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Box full={true} direction="row" align="center" pad={{ between: "small"}} margin="small" >
            <Box size={{ height: "medium", width: "large" }} style={{ display: "inline" }} direction="column" pad={{ between: "small" }} >
              <Card label="Name" size={{ height: "small", width: "small" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
                <div style={{ outline: "#a8a8a8 solid thin" }} ></div>
                <Paragraph margin="small">
                  <Paragraph margin="none" >{userInfo.first_name}</Paragraph>
                  <Paragraph margin="none" >{userInfo.last_name}</Paragraph>
                </Paragraph>
              </Card>
              <Card label="Address" size={{ height: "small", width: "small" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
              <div style={{ outline: "#a8a8a8 solid thin" }} ></div>
                <Paragraph margin="small">
                  <Paragraph margin="none" >{userInfo.street}</Paragraph>
                  <Paragraph margin="none" >{userInfo.state}</Paragraph>
                  <Paragraph margin="none" >{userInfo.zip_code}</Paragraph>
                </Paragraph>
              </Card>
              <Card wrap={true} label="Email" size={{ height: "small", width: "small" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}> 
              <div style={{ outline: "#a8a8a8 solid thin" }} ></div>       
                <Paragraph style={{ wordWrap: "break-word" }} margin="small" >{userInfo.email}</Paragraph>
              </Card>
              <Card label="Phone" size={{ height: "small", width: "small" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
              <div style={{ outline: "#a8a8a8 solid thin" }} ></div>
                <Paragraph margin="small" >{userInfo.phone}</Paragraph>
              </Card>
            </Box>
            <Card label="Accounts" size={{ height: "medium", width: "medium" }} style={{ display: "inline" }} colorIndex="light-2" margin={{ vertical: "small", horizontal: "small" }}>
            <div style={{ outline: "#a8a8a8 solid thin" }} ></div>
              <Paragraph margin="small">
                <Bank banks={userInfo.banks} />
              </Paragraph>
            </Card>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default ProfileCard;