import Axios from 'axios'
import react from 'react'

export default class GetPost extends react.Component {
    constructor(props) {
        super(props)
        this.getPostByPage = this.getPostByPage.bind(this)

        this.state = {
            page = 0,
        }
    }

    getPostByPage(getPage) {
        const page = {
            page: getPage
        }
        Axios.post('/get', page)
    }

}