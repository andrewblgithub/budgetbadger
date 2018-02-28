import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, TextInput } from 'grommet';

const ProfileCard = (props) => {
  return (
    <div>
      <Box align="left" pad="large">
              <Paragraph margin="none" >
                {props.userInfo.editName === false ? <h1 onClick={props.editName} >{props.userInfo.first_name} {props.userInfo.last_name}</h1> :     
                <h3><b onClick={props.handleSubmit} >Name: </b>
                  <li style={{ listStyleType: "none" }}>
                    <b>First Name: </b><TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="first_name" defaultValue={props.userInfo.first_name}/>
                  </li>
                  <li style={{ listStyleType: "none" }}>
                    <b>Last Name: </b><TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="last_name" defaultValue={props.userInfo.last_name}/>
                  </li>
                </h3>}
              </Paragraph>
            <div style={{ outline: "#a8a8a8 solid thin", marginBottom: "25px" }} ></div>
            <Paragraph margin="none">
              { props.userInfo.editAddress === false ? <h3><b onClick={props.editAddress} >Address: </b>{props.userInfo.street}, {props.userInfo.state}, {props.userInfo.zip_code}</h3> : 
              <h3><b onClick={props.handleSubmit} >Address: </b>
                <li style={{ listStyleType: "none" }}>
                  <b>Street </b><TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="street" defaultValue={props.userInfo.street}/>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <b>State </b><TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="state" defaultValue={props.userInfo.state}/>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <b>ZIP Code </b><TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="zip_code" defaultValue={props.userInfo.zip_code}/>
                </li>
              </h3> }
            </Paragraph>
            <div style={{ outline: "#a8a8a8 solid thin", marginBottom: "25px" }} ></div>       
            <Paragraph margin="none" >
              { props.userInfo.editEmail === false ? <h3><b onClick={props.editEmail} >Email: </b>{props.userInfo.email}</h3>: 
              <h3><b onClick={props.handleSubmit} >Email: </b>
                <li style={{ listStyleType: "none" }}>
                  <TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="email" defaultValue={props.userInfo.email}/>
                </li>
              </h3>
              }
            </Paragraph>
            <div style={{ outline: "#a8a8a8 solid thin", marginBottom: "25px" }} ></div>
            <Paragraph margin="none" >
              { props.userInfo.editPhone === false ? <h3><b onClick={props.editPhone} >Phone: </b>{props.userInfo.phone}</h3> :
              <h3><b onClick={props.handleSubmit} >Phone: </b>
              <li style={{ listStyleType: "none" }} >
                <TextInput size={{ height: "small", width: "large"}} onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        props.handleSubmit();
                      }
                    }} onDOMChange={(e) => props.handleForm(e)} name="phone" defaultValue={props.userInfo.phone}/>
              </li>
              </h3> }
            </Paragraph>
      </Box>
    </div>
  )
}

export default ProfileCard;