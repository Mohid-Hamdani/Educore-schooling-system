import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Form, 
  Input, 
  Card, 
  Descriptions, 
  Tag, 
  Image, 
  Space, 
  Typography, 
  message,
  Upload,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  ArrowLeftOutlined, 
  DeleteOutlined, 
  SaveOutlined,
  UploadOutlined,
  CloseCircleFilled
} from '@ant-design/icons';
import ButtonAlt from '../../ui/Button';
import { fetchStudents } from '../../redux/actions/studentActions';
import { addObservation, fetchObservationsByStudent } from '../../redux/actions/observationActions';
import moment from 'moment';
import styles from './AddObservation.module.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

const AddObservation = () => {
  const location = useLocation();
  const { studentId } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { students, loading: studentLoading } = useSelector((state) => state.students);
  const { observationsByStudent, loading: obsLoading } = useSelector((state) => state.observations);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
    if (studentId) {
      dispatch(fetchObservationsByStudent(studentId));
    }
  }, [dispatch, students.length, studentId]);

  const student = useMemo(() => {
    if (!studentId) return null;
    return students.find(s => s.id === studentId || s.id === Number(studentId) || s.id === String(studentId));
  }, [students, studentId]);

  console.log(studentId, "student");

  const [form] = Form.useForm();
  
  // State for weakness, strength and images
  const [weaknessList, setWeaknessList] = useState([]);
  const [weaknessInput, setWeaknessInput] = useState('');
  
  const [strengthList, setStrengthList] = useState([]);
  const [strengthInput, setStrengthInput] = useState('');
  
  const [imageList, setImageList] = useState([]);

  // Auto-fill logic from Redux
  React.useEffect(() => {
    const latestObs = observationsByStudent[studentId]?.[0] || student?.latestObservation;
    if (latestObs) {
      form.setFieldsValue({
        observation: latestObs.observationText,
        nextStep: latestObs.nextStepText,
      });
      setWeaknessList(latestObs.weakness || []);
      setStrengthList(latestObs.strength || []);
      setImageList(latestObs.images || []);
    }
  }, [student, observationsByStudent, studentId, form]);


  const today = moment().format('DD MMM, YYYY');

  const teacherName = user?.displayName || 'Teacher';

  const handleAddWeakness = () => {
    const val = weaknessInput.trim();
    if (!val) return;
    if (weaknessList.includes(val)) {
      message.warning('Weakness already added');
      return;
    }
    setWeaknessList([...weaknessList, val]);
    setWeaknessInput('');
  };

  const handleRemoveWeakness = (removedTag) => {
    const newTags = weaknessList.filter((tag) => tag !== removedTag);
    setWeaknessList(newTags);
  };

  const handleAddStrength = () => {
    const val = strengthInput.trim();
    if (!val) return;
    if (strengthList.includes(val)) {
      message.warning('Strength already added');
      return;
    }
    setStrengthList([...strengthList, val]);
    setStrengthInput('');
  };

  const handleRemoveStrength = (removedTag) => {
    const newTags = strengthList.filter((tag) => tag !== removedTag);
    setStrengthList(newTags);
  };

  const handleAddImage = (file) => {
    // Basic local preview creation
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      if (imageList.includes(url)) {
        message.warning('Image already added');
        return;
      }
      setImageList([...imageList, url]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  const handleRemoveImage = (removedImage) => {
    const newImages = imageList.filter((img) => img !== removedImage);
    setImageList(newImages);
  };

  const onFinish = async (values) => {
    try {
      const observationData = {
        studentId,
        teacherName,
        date: today,
        observationText: values.observation,
        nextStepText: values.nextStep,
        weakness: weaknessList,
        strength: strengthList,
        images: imageList,
      };

      await dispatch(addObservation(observationData));
      message.success('Observation saved successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save observation:', error);
      message.error('Failed to save observation. Please try again.');
    }
  };

  if (studentLoading) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className={styles.container}>
        <Title level={4}>Student not found</Title>
        <ButtonAlt onClick={() => navigate('/dashboard')}>Back to Dashboard</ButtonAlt>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Info Card */}
      <Card className={styles.infoCard}>
        <Descriptions column={{ xs: 1, sm: 3 }} size="middle">
          <Descriptions.Item label="Student Name"><Text strong>{student.name}</Text></Descriptions.Item>
          <Descriptions.Item label="Teacher Name"><Text strong>{teacherName}</Text></Descriptions.Item>
          <Descriptions.Item label="Date"><Text strong>{today}</Text></Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Observation Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item
          label="Observation"
          name="observation"
          rules={[{ required: true, message: 'Please enter observation' }]}
        >
          <TextArea rows={5} placeholder="Type observation here..." className={styles.fixedTextArea} />
        </Form.Item>

        <Form.Item
          label="Next Step"
          name="nextStep"
          rules={[{ required: true, message: 'Please enter next step' }]}
        >
          <TextArea rows={5} placeholder="Type next step here..." className={styles.fixedTextArea} />
        </Form.Item>

        {/* Weakness Section */}
        <div className={styles.inputSection}>
          <Text strong className={styles.label}>Weakness</Text>
          <div className={styles.inputRow}>
            <Input 
              value={weaknessInput} 
              onChange={(e) => setWeaknessInput(e.target.value)}
              placeholder="Add weakness"
              onPressEnter={(e) => {
                e.preventDefault();
                handleAddWeakness();
              }}
            />
            <ButtonAlt type="button" variant="primary" onClick={handleAddWeakness}>
              <PlusOutlined /> Add
            </ButtonAlt>
          </div>
          <div className={styles.tagWrapper}>
            {weaknessList.length > 0 ? (
              weaknessList.map((tag) => (
                <Tag 
                  key={tag} 
                  closable 
                  onClose={() => handleRemoveWeakness(tag)}
                  color="volcano"
                >
                  {tag}
                </Tag>
              ))
            ) : (
                <Text type="secondary" italic>No weaknesses added</Text>
            )}
          </div>
        </div>

        {/* Strength Section */}
        <div className={styles.inputSection}>
          <Text strong className={styles.label}>Strength</Text>
          <div className={styles.inputRow}>
            <Input 
              value={strengthInput} 
              onChange={(e) => setStrengthInput(e.target.value)}
              placeholder="Add strength"
              onPressEnter={(e) => {
                e.preventDefault();
                handleAddStrength();
              }}
            />
            <ButtonAlt type="button" variant="primary" onClick={handleAddStrength}>
              <PlusOutlined /> Add
            </ButtonAlt>
          </div>
          <div className={styles.tagWrapper}>
            {strengthList.length > 0 ? (
              strengthList.map((tag) => (
                <Tag 
                  key={tag} 
                  closable 
                  onClose={() => handleRemoveStrength(tag)}
                  color="green"
                >
                  {tag}
                </Tag>
              ))
            ) : (
                <Text type="secondary" italic>No strengths added</Text>
            )}
          </div>
        </div>

        {/* Images Section */}
        <div className={styles.inputSection}>
          <Text strong className={styles.label}>Images</Text>
          <div className={styles.uploadRow}>
            <Upload
              beforeUpload={handleAddImage}
              showUploadList={false}
              multiple
              accept="image/*"
            >
              <ButtonAlt type="button" variant="secondary" className={styles.uploadBtn}>
                <UploadOutlined /> Click to Upload Image
              </ButtonAlt>
            </Upload>
          </div>
          <div className={styles.imageWrapper}>
            {imageList.length > 0 ? (
              <Space wrap size={[16, 16]}>
                {imageList.map((img, index) => (
                  <div key={index} className={styles.imageItem}>
                    <Image width={100} height={100} src={img} className={styles.thumb} />
                    <CloseCircleFilled 
                      className={styles.deleteImgIcon}
                      onClick={() => handleRemoveImage(img)}
                    />
                  </div>
                ))}
              </Space>
            ) : (
                <Text type="secondary" italic>No images added</Text>
            )}
          </div>
        </div>

        <div className={styles.footerRow}>
          <Space size="large">
            <ButtonAlt variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </ButtonAlt>
            <ButtonAlt 
              variant="primary" 
              type="submit" 
              disabled={obsLoading}
            >
              {obsLoading ? 'Saving Observation...' : (
                <>
                  <SaveOutlined /> Save Observation
                </>
              )}
            </ButtonAlt>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AddObservation;
