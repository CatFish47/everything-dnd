import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const CharacterForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.character?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>
        
          <TextField
            name="image"
            defaultValue={props.character?.image}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="isPlayer"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is player
        </Label>
        
          <CheckboxField
            name="isPlayer"
            defaultChecked={props.character?.isPlayer}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isPlayer" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.character?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="str"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Str
        </Label>
        
          <NumberField
            name="str"
            defaultValue={props.character?.str}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="str" className="rw-field-error" />

        <Label
          name="dex"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dex
        </Label>
        
          <NumberField
            name="dex"
            defaultValue={props.character?.dex}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="dex" className="rw-field-error" />

        <Label
          name="con"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Con
        </Label>
        
          <NumberField
            name="con"
            defaultValue={props.character?.con}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="con" className="rw-field-error" />

        <Label
          name="int"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Int
        </Label>
        
          <NumberField
            name="int"
            defaultValue={props.character?.int}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="int" className="rw-field-error" />

        <Label
          name="wis"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wis
        </Label>
        
          <NumberField
            name="wis"
            defaultValue={props.character?.wis}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="wis" className="rw-field-error" />

        <Label
          name="cha"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cha
        </Label>
        
          <NumberField
            name="cha"
            defaultValue={props.character?.cha}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cha" className="rw-field-error" />

        <Label
          name="hp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hp
        </Label>
        
          <NumberField
            name="hp"
            defaultValue={props.character?.hp}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="hp" className="rw-field-error" />

        <Label
          name="ac"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ac
        </Label>
        
          <NumberField
            name="ac"
            defaultValue={props.character?.ac}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="ac" className="rw-field-error" />

        <Label
          name="lvl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lvl
        </Label>
        
          <NumberField
            name="lvl"
            defaultValue={props.character?.lvl}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="lvl" className="rw-field-error" />

        <Label
          name="speed"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Speed
        </Label>
        
          <NumberField
            name="speed"
            defaultValue={props.character?.speed}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="speed" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CharacterForm
