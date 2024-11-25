export default {
    containerPrimary: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        '& > section:first-of-type': {
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            '& button': {
                background: 'rgb(95 20 20)',
                color: 'white'
            },
        },
        '& > section:last-of-type': {
            display: 'flex',
            justifyContent: 'center',
            alingItems: 'center',
            minHeigth: '3em',
            width: '100%',
            flexWrap: 'wrap',
            '& > div > div': {
                position: 'relative',
                width: '200px',
                height: '234px',
                '& > div': {
                    padding: 'unset',
                },
                '& > div > button': {
                    display: 'flex',
                    justifyContent: 'center',
                    alingItems: 'center',
                    borderRadius: '100%',
                    width: '30px',
                    height: '30px',
                    minWidth: 'unset',
                    position: 'absolute',
                    top: '-5px',
                    left: '10px',
                    borderColor: 'gray',
                    '& > div': {
                        display: 'flex',
                        justifyContent: 'center',
                        alingItems: 'center',
                    },
                    '& > div > img': {
                        width: '15px',
                        height: '15px',
                    }
                }   
            }
        }
    },
    drawer: {
        '& div.MuiPaper-root': {
            width: 300, 
            padding: 3, 
            marginTop: 'unset',
            '& button': {
                background: 'rgb(95 20 20)',
                color: 'white'
            },
        }
    },
    containerLogin: {
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        '& > section:first-of-type': {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "400px",
            borderRight: "solid rgb(95 20 20) 1px",
            borderRadius: "0 5px 5px 0",
            padding: "5px",
            background: "#fffeee",
            height: "100%",
            width: "100%"
        },
        '& > section:last-of-type': {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            maxWidth: "calc(100% - 400px)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
        },
        '& form': {
            display: "flex",
            width: "90%",
            flexDirection: "column",
            '& button': {
                padding: "10px",
                background: "rgb(95 20 20)"
            }
        }
    },
    containerPanelLogin: {
        // width: "95%",
        height: "100%",
        // border: "solid rgb(95 20 20) 1px",
        // borderRadius: "10px",
        // padding: "5px",
        // background: "#fff",
        // overflow: "hidden"
        '& video': {
            objectFit: "cover"
        }
    }
}