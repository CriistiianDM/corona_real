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
            width: "100%",
            '@media (max-width: 500px)': {
                maxWidth: "ll500px)",
            },
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
            '@media (max-width: 500px)': {
                maxWidth: "calc(100% - 500px)",
            },
        },
        '& form': {
            display: "flex",
            width: "90%",
            flexDirection: "column",
            justifyContent: 'center',
            alingItems: 'center',
            '& button': {
                padding: "10px",
                background: "rgb(95 20 20)"
            },
            '& .MuiGrid2-root': {
                display: "flex",
                justifyContent: 'center',
                alingItems: 'center',                
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
    },
    containerHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 25px",
        width: "100%",
        overflow: "hidden",
        '& button': {
            background: "unset !important",
            padding: "unset",
            boxShadow: "unset",
            '&:hover': {
                background: "unset !important",
                padding: "unset",
                boxShadow: "unset",
            },
            '& .MuiAvatar-root': {
                width: "40px",
                height: "40px",
                background: "#D9D9D9"
            },
            '& img': {
                width: "30px",
                height: "auto",
            }
        }
    },
    toogleMenuUser: {
        '& .MuiPaper-root': {
            minWidth: "130px",
            background: "#D9D9D9",
            '& h2': {
                textAlign: "center",
            },
            '& ul': {
                color: 'white',
                padding: '10px',
            }
        }
    },
    containerLogo: {
        display: 'flex',
        justifyContent: 'center',
        maxHeight: '225px',
        width: "100%",
        overflow: 'hidden'
    },
    boxContainerPrimary: {
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: 'center',
        padding: "20px",
        maxWidth: "1300px",
        margin: "-50px auto 30px auto",
        minHeight: "500px",
        borderRadius: "10px",
        width: "calc(95% - 40px)",
        background: "#433A3A",
        overflowY: "auto",
        overflowX: "hidden"
    },
    containerBoxHome: {
        cursor: 'pointer',
        display: "flex",
        flexWrap: "wrap",
        padding: "14px",
        margin: "10px 10px",
        background: '#D9D9D9',
        width: '170px',
        overflow: "hidden",
        '@media (max-width: 500px)': {
            width: '100%',
        },
        height: '200px',
        borderRadius: '8px',
        '& .MuiListItemIcon-root': {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            '& svg': {
                width: "70%",
                height: "70%",
                '@media (max-width: 500px)': {
                    width: "50%",
                    height: "50%",
                },
            }
        },
        '& span': {
            width: '100%',
            fontSize: '20px',
            textAlign: 'center',
            color: '#5c0100',
            fontWeight: 'bold'
        }
    }
}