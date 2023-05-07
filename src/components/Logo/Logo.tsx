import styled from '@emotion/styled'

const LogoT = styled('span')({
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: 20,
    textTransform: 'uppercase'
})

const Logo = () => {
    return (
        <LogoT>
            Chess
        </LogoT>
    )
}

export default Logo