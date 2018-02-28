import React, { Component } from 'react';
import {App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, SkipLinkAnchor, Card, Hero, Label, Heading, Columns, Image } from 'grommet';

const Splash = ({ match, location, history }) => {
    return (
      
        <Article>


          <Box full="horizontal">
            <Hero background={<Image src='https://lh3.googleusercontent.com/tSEL7VbU51DxFg8xy1oKn3WjYkxprg2deMAUhrrMpUXDnhvngKPFN6HJBJP2ZQdSnyoRVxJnt-TLkMMXid_6MTTfiGx926GVyNqVjEJkZrA_52MPbSeFPU9DYYvCwq-AeTGo31_uGhiUF3h7zHl-OKcD5r9kMGSbB4to-DbNCCezPiMIYaGtx1qx5GpTCUziTKriyKihwhjbrxpTg-x8MHNTNJCf7-IxJ2Jk4UVOyMh22Td9ufbfi8d0wQ3hd_lgIuxv0BvJ-ATrcOmWByZrV7jWkunMxVI62hUx8Ej0ytWQNwVm3-R833eyYtYgiM6nVB6Ra85xtouhH9xT2peNwpK3Cwf6ZD_RbG7DAd4zWgc9p6C3nkB5B03BikqIOgxci5mCevw9Z4UHhgpyBR9KQ4W3xiDc_tTfoK2o_lmOK45G86zmHK1LVK-9qQ5T5v-pQNYkrSy16m5tx9rxpgkRGf8tq1JmZ01EavVbQhQAC3NOhQ5D6hZIW6ivYZBdpsUq0rHk17d4Lgf5B4PD_jQz-oHpSAJAg001vGxRjhu47-iu0afv6O2fDGxGGKPVHiKbiDtes5KiOtGCNu931OC0tutC4d-pC-vhQVIGS53uvX39-1uw94_ZYoVh0qYmHmnv0l8m1EeUlqF4kUsg6iHoY1QXZO10BTwr=w2400-h1160-no' fit="cover" full={true} />}>
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="end" pad="medium" />
                <Box basis="1/2" align="start" pad={{horizontal: "large", vertical: "large", between: "medium"}}>
                  <Label margin="none" size="medium" uppercase={true}>Learn to Manage Your Money</Label>
                  <h1>Accelerate your wallet with Budget Badger</h1>
                  <Paragraph margin="medium" size="large">Budget Badger can help you benefit now, just sign up and start having more control over your money</Paragraph>
                </Box>
              </Box>
            </Hero>
          </Box>
          
          <Section>
            <Box align="center" pad="none">
              <Box align="center" pad="large" textAlign="center" align="center" size={{ width: {max: "xxlarge"}}}>
                <h1 class="grommetux-heading grommetux-heading grommetux-heading--margin-none">Our services can make managing your money a breeze.</h1>
                <p class="grommetux-paragraph grommetux-paragraph--xlarge grommetux-paragraph--width-large">We provide state of the art loan management, budgeting, money tracking, and alerts.</p>
              </Box>
            </Box>
          </Section>

          <Box align="center"
            announce={false}
            colorIndex="light-1"
            direction="column"
            focusable={true}
            size={{ vertical: "small" }}
            pad="none"
            responsive={true}
            wrap={true}>
            <h1>Meet The Devs</h1>
                            <div className="grommetux-columns grommetux-columns--justify-center grommetux-columns--margin-medium grommetux-columns--responsive grommetux-columns--small">                                <Card size="small" colorIndex="light-1" margin="small"
                                  contentPad="none"
                                  direction="column"
                                  headingStrong={true}
                                  margin="small"
                                  textSize="small">
                                    <Image src="https://media.licdn.com/media/AAEAAQAAAAAAAAacAAAAJGNjYWY1NWExLTlmYzgtNGE5Ni05NjczLWZlYTQ0NTQ4ZmE0Yw.jpg"
                                      fit="contain" />
                                    <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--margin-small grommetux-box--wrap grommetux-box--width-medium grommetux-box--size grommetux-background-color-index-light-1 grommetux-background-color-index--light"
                                      ariaLabel="Card"
                                      role="group"
                                      tabIndex={0}>
                                            <Label size="medium"
                                              margin="none"
                                              uppercase={true}>
                                              <label className="grommetux-label grommetux-label--uppercase grommetux-label--margin-none grommetux-label--medium">Product Owner</label>
                                            </Label>
                                            <Heading tag="h3">
                                              <a href="http://linkedin.com/in/gustafbrostedt/" target="_blank" style={{ color: "#000" }} >Gustaf Brostedt</a>
                                            </Heading>
                                      </div>
                                  </Card>
                                  <Card size="small" colorIndex="light-1" margin="small"
                                  contentPad="none"
                                  direction="column"
                                  headingStrong={true}
                                  margin="small"
                                  textSize="small">
                                  <Image src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAMAAQDuAAgAAQAAAAAAABG_AAAAJGE2MWZmM2RjLWU1NDgtNDFlYi05MjdhLWUxNzRjZTM4Y2UyYQ.bin"
                                      fit="contain" />
                                    <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--margin-small grommetux-box--wrap grommetux-box--width-medium grommetux-box--size grommetux-background-color-index-light-1 grommetux-background-color-index--light"
                                      ariaLabel="Card"
                                      role="group"
                                      tabIndex={0}>
                                            <Label size="medium"
                                              margin="none"
                                              uppercase={true}>
                                              <label className="grommetux-label grommetux-label--uppercase grommetux-label--margin-none grommetux-label--medium">Developer</label>
                                            </Label>
                                            <Heading tag="h3">
                                              <a href="http://www.linkedin.com/in/afriedman1991/" target="_blank" style={{ color: "#000" }} >Alex Friedman</a>
                                            </Heading>
                                      </div>
                                  </Card>
                              <Card size="small" colorIndex="light-1" margin="small"
                                  contentPad="none"
                                  direction="column"
                                  headingStrong={true}
                                  margin="small"
                                  textSize="small">
                                  <Image src="https://media.licdn.com/media/AAEAAQAAAAAAAAdoAAAAJDU1ZjhiZmUxLTFjMDQtNGYyZS05Y2E1LTY3YzIzYWM4NDc1ZQ.jpg"
                                      fit="contain" />
                                    <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--margin-small grommetux-box--wrap grommetux-box--width-medium grommetux-box--size grommetux-background-color-index-light-1 grommetux-background-color-index--light"
                                      ariaLabel="Card"
                                      role="group"
                                      tabIndex={0}>
                                            <Label size="medium"
                                              margin="none"
                                              uppercase={true}>
                                              <label className="grommetux-label grommetux-label--uppercase grommetux-label--margin-none grommetux-label--medium">Developer</label>
                                            </Label>
                                            <Heading tag="h3">
                                              <a href="http://www.linkedin.com" target="_blank" style={{ color: "#000" }} >Andrew Lichtenstein</a>
                                            </Heading>
                                      </div>                                      
                                  </Card>
                              <Card size="small" colorIndex="light-1" margin="small"
                                  contentPad="none"
                                  direction="column"
                                  headingStrong={true}
                                  margin="small"
                                  textSize="small">
                                  <Image src="https://media.licdn.com/media/AAIA_wDGAAAAAQAAAAAAAA2TAAAAJDUxNmIxZjYzLWI5ZjQtNDg4NS05NTkwLWY2YmYzYjZmZjhhZQ.jpg"
                                      fit="contain" />
                                    <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--margin-small grommetux-box--wrap grommetux-box--width-medium grommetux-box--size grommetux-background-color-index-light-1 grommetux-background-color-index--light"
                                      ariaLabel="Card"
                                      role="group"
                                      tabIndex={0}>
                                            <Label size="medium"
                                              margin="none"
                                              uppercase={true}>
                                              <label className="grommetux-label grommetux-label--uppercase grommetux-label--margin-none grommetux-label--medium">Developer</label>
                                            </Label>
                                            <Heading tag="h3">
                                              <a href="https://www.linkedin.com/in/jkang1220/" target="_blank" style={{ color: "#000" }} >Jimmy Kang</a>
                                            </Heading>
                                      </div>                                      
                                  </Card>
                                  <Card size="small" colorIndex="light-1" margin="small"
                                  contentPad="none"
                                  direction="column"
                                  headingStrong={true}
                                  margin="small"
                                  textSize="small">
                                  <Image src="https://media.licdn.com/media/AAMAAQDuAAgAAQAAAAAAAA__AAAAJDc2N2Y3YmEyLTdkZDQtNGFhYi05OTVjLTM5ZmNhYWQ1OTU0Nw.bin"
                                      fit="contain" />
                                    <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--margin-small grommetux-box--wrap grommetux-box--width-medium grommetux-box--size grommetux-background-color-index-light-1 grommetux-background-color-index--light"
                                      ariaLabel="Card"
                                      role="group"
                                      tabIndex={0}>
                                            <Label size="medium"
                                              margin="none"
                                              uppercase={true}>
                                              <label className="grommetux-label grommetux-label--uppercase grommetux-label--margin-none grommetux-label--medium">Developer</label>
                                            </Label>
                                            <Heading tag="h3">
                                              <a href="https://www.linkedin.com/in/logan-mcbride/" target="_blank" style={{ color: "#000" }} >Logan McBride</a>
                                            </Heading>
                                      </div>                                      
                                  </Card>
                            </div>
            </Box>
          <Footer style={{background: "#000"}}
            justify='between'
            size='medium'
            primary={true}
            pad={{
              horizontal: "medium"
            }} >
            <Title>
              <Paragraph style={{ color: "#FFF" }}>Budget Badger</Paragraph>
            </Title>
            <Box direction='row'
              align='center'
              pad={{"between": "medium"}}>
              <Paragraph margin='none' style={{ color: "#FFF" }}>
                © 2018 Turba Priami
              </Paragraph>
              <Menu direction='row'
                size='small'
                dropAlign={{"right": "right"}}>
                <Anchor href='#'>
                  Support
                </Anchor>
                <Anchor href='#'>
                  Contact
                </Anchor>
                <Anchor href='#'>
                  About
                </Anchor>
              </Menu>
            </Box>
          </Footer>
        </Article>
      
    )
}

export default Splash;