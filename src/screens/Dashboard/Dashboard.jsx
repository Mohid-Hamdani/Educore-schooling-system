import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List, Modal, Typography, Descriptions, Tag, Image, Space, Spin } from 'antd';
import {
  PlusOutlined,
  CloseOutlined,
  CalendarOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchObservationsByStudent } from '../../redux/actions/observationActions';
import ButtonAlt from '../../ui/Button';
import moment from 'moment';
import styles from './Dashboard.module.css';

const { Title, Text, Paragraph } = Typography;

const gradeOptions = ['Grade 1', 'Grade 2', 'Grade 3'];

function formatDate(date) {
  if (!date) return 'N/A';
  
  // Handle Firestore Timestamp
  const d = typeof date.toDate === 'function' ? date.toDate() : date;
  
  return moment(d).format('DD MMM, YYYY');
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const { observationsByStudent, loading: obsLoading } = useSelector((state) => state.observations);

  // console.log("observationsByStudent:", observationsByStudent);
  
  const [selectedGrade, setSelectedGrade] = useState('Grade 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPanels, setExpandedPanels] = useState({});

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);


  // console.log("selectedStudent:", selectedStudent);

  const filteredStudents = useMemo(() => {
    // Lenient filtering: match "Grade 1", "grade 1", or just "1"
    const studentsByGrade = students.filter(s => {
      if (!s.grade) return false;
      const sGrade = String(s.grade).toLowerCase();
      const selGrade = String(selectedGrade).toLowerCase();
      return sGrade === selGrade || sGrade === selGrade.replace('grade ', '');
    });
    
    // console.log("Filtered Students for " + selectedGrade + ":", studentsByGrade);
    
    if (!searchQuery.trim()) return studentsByGrade;
    const query = searchQuery.toLowerCase();
    return studentsByGrade.filter((s) => s.name.toLowerCase().includes(query));
  }, [students, selectedGrade, searchQuery]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    dispatch(fetchObservationsByStudent(student.id));
    setIsModalOpen(true);
    setExpandedPanels({});
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setExpandedPanels({});
  };

  const togglePanel = (key) => {
    setExpandedPanels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Sync selectedStudent data with Redux state
  const currentStudentData = useMemo(() => {
    if (!selectedStudent) return null;
    return students.find(s => s.id === selectedStudent.id) || selectedStudent;
  }, [students, selectedStudent]);

  const latestObsFromSlice = useMemo(() => {
    if (!selectedStudent || !observationsByStudent[selectedStudent.id]) return null;
    return observationsByStudent[selectedStudent.id][0]; // Assuming order is desc by updatedAt
  }, [selectedStudent, observationsByStudent]);

  const obs = latestObsFromSlice || currentStudentData?.latestObservation || {
    teacherName: 'N/A',
    date: null,
    observationText: 'No observation recorded yet.',
    nextStepText: 'No next steps assigned.',
    weakness: [],
    strength: [],
    images: []
  };

  return (
    <div className={styles.container}>
      {/* Filter Row */}
      <div className={styles.filterRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search student..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles.separator}></div>
        <select
          className={styles.gradeSelect}
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Heading */}
      <h2 className={styles.heading}>{selectedGrade} Students</h2>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <Spin size="large" />
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', color: 'var(--danger-color)', marginTop: '2rem' }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      {/* Student Grid */}
      {!loading && !error && (
        <List
          grid={{
          gutter: 20,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={filteredStudents}
        locale={{ emptyText: 'No students found' }}
        renderItem={(student) => (
          // console.log("student:itemmmmmmmmmmm", student),
          <List.Item className={styles.left}>
            <div
              className={styles.studentCard}
              onClick={() => handleStudentClick(student)}
            >
              <img
                className={styles.studentPhoto}
                src={student.photo}
                alt={student.name}
              />
              <p className={styles.studentName}>{student.name}</p>
              <p className={styles.observationDate}>
                Last observation: {formatDate(student.updatedAt)}
              </p>
            </div>
          </List.Item>
        )}
      />
      )}

      {/* Observation Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleModalClose}
        width={680}
        centered
        destroyOnClose
        className={styles.observationModal}
        footer={
          <div className={styles.modalFooter}>
            <ButtonAlt variant="secondary" onClick={handleModalClose}>
              <CloseOutlined /> Close
            </ButtonAlt>
            <ButtonAlt 
                variant="primary"
                onClick={() => {
                  handleModalClose();
                  navigate("/students/add-observation", {state: {studentId: currentStudentData?.id}});
                }}
            >
              <PlusOutlined /> Add Observation
            </ButtonAlt>
          </div>
        }
      >
        {currentStudentData && (
          <div className={styles.modalBody}>
            {obsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', width: '100%' }}>
                <Spin size="large" tip="Loading observation..." />
              </div>
            ) : (
              <>
                {/* Header */}
            <div className={styles.modalHeader}>
              <img
                className={styles.modalStudentPhoto}
                src={currentStudentData.photo || ''}
                alt={currentStudentData.name}
              />
              <div className={styles.modalHeaderInfo}>
                <Title level={4} style={{ margin: 0, color: 'var(--text-color)' }}>
                  Student Observation
                </Title>
                <Title level={5} style={{ margin: '4px 0 0', color: 'var(--primary-color)' }}>
                  {currentStudentData.name}
                </Title>
                <Space size="large" style={{ marginTop: 8 }}>
                  <Text type="secondary">
                    <UserOutlined style={{ marginRight: 6 }} />
                    {obs.teacherName}
                  </Text>
                  <Text type="secondary">
                    <CalendarOutlined style={{ marginRight: 6 }} />
                    {formatDate(obs.date)}
                  </Text>
                </Space>
              </div>
            </div>

            {/* Observation & Next Step */}
            <Descriptions
              column={1}
              bordered
              size="middle"
              style={{ marginTop: 24 }}
              labelStyle={{ fontWeight: 600, width: 140 }}
            >
              <Descriptions.Item label="Observation">
                <Paragraph style={{ margin: 0 }}>{obs.observationText}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Next Step">
                <Paragraph style={{ margin: 0 }}>{obs.nextStepText}</Paragraph>
              </Descriptions.Item>
            </Descriptions>

            {/* Collapsible Panels */}
            <div className={styles.panelsColumn}>
              {/* Weakness */}
              <div className={styles.collapsibleSection}>
                <div
                  className={styles.collapsibleHeader}
                  onClick={() => togglePanel('weakness')}
                >
                  <span className={styles.collapsibleTitle}>Weakness</span>
                  <DownOutlined
                    className={`${styles.chevron} ${expandedPanels.weakness ? styles.chevronOpen : ''}`}
                  />
                </div>
                <div
                  className={`${styles.collapsibleBody} ${expandedPanels.weakness ? styles.collapsibleBodyOpen : ''}`}
                >
                  <div className={styles.collapsibleContent}>
                    {obs.weakness.length > 0 ? (
                      <Space size={[4, 8]} wrap>
                        {obs.weakness.map((w, idx) => (
                          <Tag color="volcano" key={idx}>
                            {w}
                          </Tag>
                        ))}
                      </Space>
                    ) : (
                      <Text type="secondary" italic>
                        No weaknesses added
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Strength */}
              <div className={styles.collapsibleSection}>
                <div
                  className={styles.collapsibleHeader}
                  onClick={() => togglePanel('strength')}
                >
                  <span className={styles.collapsibleTitle}>Strength</span>
                  <DownOutlined
                    className={`${styles.chevron} ${expandedPanels.strength ? styles.chevronOpen : ''}`}
                  />
                </div>
                <div
                  className={`${styles.collapsibleBody} ${expandedPanels.strength ? styles.collapsibleBodyOpen : ''}`}
                >
                  <div className={styles.collapsibleContent}>
                    {obs.strength.length > 0 ? (
                      <Space size={[4, 8]} wrap>
                        {obs.strength.map((s, idx) => (
                          <Tag color="green" key={idx}>
                            {s}
                          </Tag>
                        ))}
                      </Space>
                    ) : (
                      <Text type="secondary" italic>
                        No strengths added
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className={styles.collapsibleSection}>
                <div
                  className={styles.collapsibleHeader}
                  onClick={() => togglePanel('images')}
                >
                  <span className={styles.collapsibleTitle}>Images</span>
                  <DownOutlined
                    className={`${styles.chevron} ${expandedPanels.images ? styles.chevronOpen : ''}`}
                  />
                </div>
                <div
                  className={`${styles.collapsibleBody} ${expandedPanels.images ? styles.collapsibleBodyOpen : ''}`}
                >
                  <div className={styles.collapsibleContent}>
                    {obs.images.length > 0 ? (
                      <Image.PreviewGroup>
                        <Space size={[8, 8]} wrap>
                          {obs.images.map((img, idx) => (
                            <Image
                              key={idx}
                              width={80}
                              height={80}
                              src={img}
                              style={{ borderRadius: 8, objectFit: 'cover' }}
                              placeholder
                            />
                          ))}
                        </Space>
                      </Image.PreviewGroup>
                    ) : (
                      <Text type="secondary" italic>
                        No images uploaded
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
