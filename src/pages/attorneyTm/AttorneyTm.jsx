import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import CustomNotFound from "../../components/shared/CustomNotFound";

const AttorneyTm = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const lawyersData = location.state?.lawyers || [];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // token get in cookies
  const userToken = Cookies.get("userToken");

  const handleNavigate = () => {
    navigate(-1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = lawyersData?.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-28 md:py-40">
      <div>
        <div className="max-w-[1037px] mx-auto px-10">
          <span>
            <FaArrowLeft
              onClick={handleNavigate}
              className="text-[20px] text-[#60606A] cursor-pointer"
            />
          </span>

          <h3 className="font-roboto text-[16px] text-[#121221] py-[26px]">
            LawPair suggested attorneys
          </h3>
          {/* <h3 className="font-roboto text-[16px] text-[#121221] py-[26px]">
            LawPair suggested attorneys TM
          </h3> */}
        </div>

        <div className="flex justify-center">
          {!paginatedData?.length ? (
            <>
              <CustomNotFound offBack />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                {paginatedData?.map((attorney, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/attorney-tm-details/${attorney.id}?is_favorite=${attorney.is_favorite}`}
                    >
                      <div
                        key={index}
                        className="w-[300px] min-h-[430px] p-4 shadow-lg rounded-md"
                      >
                        
                        <img
                          src={attorney?.avatar}
                          alt="attorney"
                          className="w-full h-[250px] object-cover"
                        />
                        <div className="flex justify-between items-center">
                          <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px] capitalize">
                            {attorney.full_name}
                          </h2>
                          {attorney.is_favorite === false ? (
                            <span>
                              <FaRegCheckCircle />
                            </span>
                          ) : (
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z"
                                  fill="#05C793"
                                />
                              </svg>
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold font-roboto text-[#001018] capitalize">
                          {attorney.state}
                        </h3>
                        <div className="text-[14px] font-roboto text-[#001018]">
                          {attorney?.categories?.map((categorie, index) => {
                            return (
                              <div key={index}>
                                <h1>{index + 1}. {categorie}</h1>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="py-8">
          <Pagination
            current={currentPage}
            total={lawyersData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            align="center"
          />
        </div>
      </div>
    </div>
  );
};

export default AttorneyTm;
