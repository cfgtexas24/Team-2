import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
}