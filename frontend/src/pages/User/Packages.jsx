import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PackagePageTourCard from '../../shared/PackagePageTourCard';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Input, Row } from 'reactstrap';
import banner from '../../assets/packagePageImage.jpeg';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/user/packages/');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handleSortOptionClick = (order) => {
    setSortOrder(order);
    toggleSortDropdown(); // Close the dropdown after selection
  };

  const filteredPackages = packages.filter((pack) =>
    pack.package_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.sale_price - b.sale_price;
    } else {
      return b.sale_price - a.sale_price;
    }
  });

  return (
    <>
      <div className="header-image mb-4 text-center">
        <img src={banner} alt="Banner" style={{ height: '17rem', width: '100%' }} />
      </div>
      <div className="search-filter">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            {/* Search bar */}
            <Input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Col>
          <Col sm="3">
            {/* Sort dropdown */}
            <ButtonDropdown isOpen={sortDropdownOpen} toggle={toggleSortDropdown}>
              <DropdownToggle caret>
                Sort
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleSortOptionClick('asc')}>Low to High</DropdownItem>
                <DropdownItem onClick={() => handleSortOptionClick('desc')}>High to Low</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </Row>
      </div>
      <Row>
        {sortedPackages.map((pack) => (
          <Col lg="3" className="mb-4" key={pack.id}>
            <PackagePageTourCard pack={pack} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Packages;

