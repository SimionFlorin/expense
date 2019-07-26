import React from 'react'
import { DialogContent, DialogActions, DialogContentText, DialogTitle,Dialog } from '@material-ui/core';
import { fetch } from './CategoriesList';

const CategoryTypeDialog =(props)=>{


   const [name,setName]=React.useState('')
   const [description,setDescription]=React.useState('')

   const handleChange=(e)=>{
       if(e.target.name==='name')
            setName(e.target.value)
        if(e.target.name==='description')
            setDescription(e.target.value)
   }

    const SaveCatgeoryType=()=>{
        
        fetch({
            query:` mutation {
                postCategoryType(name:"${name}",description:"${description}",categoryId:${props.categoryId}){
                    typeId,
                    name,
                    description,
                    categoryId
                }
            }
            `
        }).then((res)=>{
            console.log(res);
            props.addCategoryTypeToStore(res.data.postCategoryType)
        })
        props.CloseCategoryDialog()
    }


    return(
        <Dialog open={props.isCategoryDialogOpen}>
                    <DialogTitle>
                        Add a new {props.name}Type
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Name: <input type="text" name="name" required="true" onChange={handleChange}></input>
                            Description: <input type="text" name="description" required="true" onChange={handleChange}></input>
                            {/* <br>{JSON.stringify(props.category)}</br> */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={()=>{
                            props.CloseCategoryDialog()
                        }}>Cancel</button>
                        <button type="submit" onClick={()=>{SaveCatgeoryType()}}>Save {props.name}Type</button>
                    </DialogActions>
                </Dialog>
    )
}
export default CategoryTypeDialog