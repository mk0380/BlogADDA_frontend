import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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


const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://blogadda-backend.onrender.com/post/' + id).then(response => {
            response.json().then(res => {
                setTitle(res.data.title)
                setContent(res.data.content)
                setSummary(res.data.summary)
            })
        })
    }, [])

    async function updatePost(ev) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if (files?.[0])
            data.set('file', files?.[0]);

        ev.preventDefault();
        const response = await fetch('https://blogadda-backend.onrender.com/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        const result = await response.json();
        alert(result.message)
        if (result.success) {
            return navigate('/post/' + id)
        }
    }

    const imageHandler =async (ev) =>{
        await setFiles(ev.target.files)
     }
 

    return (
        <form onSubmit={updatePost} encType="multipart/form-data" style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
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
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             onChange={imageHandler}
             />
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} required />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>

    )
}

export default EditPost
