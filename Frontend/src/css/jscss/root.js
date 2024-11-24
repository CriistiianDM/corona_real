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
    }
}