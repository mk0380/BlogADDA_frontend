import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {TextField} from '@material-ui/core'


const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ]
};

const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
];


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState("");

    const navigate = useNavigate();

    async function createNewPost(ev) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files);

        ev.preventDefault();
        const response = await fetch('https://blogadda-backend.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        const result = await response.json();
        alert(result.message)
        if (result.data) {
            return navigate('/')
        }
    }

    const imageHandler =async (ev) =>{
       await setFiles(ev.target.files[0])
    }

    return (
        <form onSubmit={createNewPost} encType="multipart/form-data" style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
            <TextField type="text"
            required
                label={'Title'}
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             value={title}
             onChange={ev => setTitle(ev.target.value)}/>
            <TextField type="text"
            required
                label={'Summary'}
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             value={summary}
             onChange={ev => setSummary(ev.target.value)}/>
             <TextField type="file"
            required
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             onChange={imageHandler}
             />
            
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} required fullWidth/>
            <button style={{ marginTop: '5px' }}>Create post</button>
        </form>

    )
}

export default CreatePost
