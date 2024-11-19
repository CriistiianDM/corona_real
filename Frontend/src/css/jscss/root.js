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