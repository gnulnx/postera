import React from "react";

const style = {
  bottom: "5px",
  position: "relative",
  fontSize: 32
}

const headerStyle = {
  marginLeft: "25px",
  marginBottom: "25px",
  marginTop: "25px"
}


export const Header = () => {
  return (
    
    <header style={headerStyle}>
      <svg width="158" height="38" viewBox="0 0 158 38" fill="none">
        <path d="M62.753 8.07748C62.1823 7.11242 61.4233 6.28461 60.526 5.64831C59.6631 5.03203 58.7082 4.57097 57.7005 4.28415C56.8028 4.02011 55.8758 3.8809 54.9435 3.87012H46.3643V5.57412H48.8471V31.9814H46.3643V33.6854H54.4958V31.9814H50.4757V19.6657H54.9983C57.7987 19.6657 59.9405 18.9413 61.4236 17.4926C62.9068 16.0439 63.6476 14.0981 63.6461 11.6554C63.6807 10.3979 63.3707 9.15627 62.753 8.07748ZM61.6932 13.7926C61.4569 14.5577 61.0578 15.2566 60.526 15.8364C59.8912 16.5163 59.1216 17.0417 58.2715 17.3753C57.3304 17.7742 56.1495 17.9736 54.7288 17.9736H50.4757V5.56216H54.7768C55.7453 5.55547 56.7079 5.72221 57.6228 6.05517C58.4641 6.35616 59.2476 6.8116 59.9367 7.40018C60.5677 7.94446 61.0881 8.61586 61.467 9.37463C61.8288 10.0855 62.0186 10.8785 62.0198 11.6841C62.0136 12.4002 61.9035 13.1112 61.6932 13.7926Z" fill="#0D1827"></path><path d="M78.0843 22.4366C77.6806 21.4383 77.093 20.5332 76.3552 19.7729C75.6148 19.0172 74.7465 18.4125 73.7947 17.9899C72.8052 17.547 71.7392 17.3222 70.6632 17.3294C69.5936 17.3202 68.534 17.5452 67.5522 17.9899C65.645 18.8448 64.1286 20.4414 63.3219 22.4438C62.9058 23.4714 62.6914 24.5763 62.6914 25.6926C62.6914 26.8089 62.9058 27.9138 63.3219 28.9415C63.7232 29.9268 64.3035 30.8209 65.0305 31.5741C65.7569 32.3206 66.6087 32.9202 67.543 33.3427C68.5248 33.7874 69.5844 34.0124 70.654 34.0032C71.7301 34.0105 72.796 33.7856 73.7856 33.3427C74.7346 32.9212 75.6023 32.3218 76.3461 31.5741C77.4765 30.4129 78.2462 28.9215 78.5547 27.2947C78.8632 25.6679 78.6961 23.9815 78.0752 22.4557L78.0843 22.4366ZM76.4352 28.2474C75.9513 29.4479 75.1392 30.4715 74.101 31.1891C73.0629 31.9068 71.8452 32.2864 70.6015 32.2801C69.7603 32.286 68.9269 32.1109 68.1529 31.7655C66.6442 31.0919 65.4444 29.8305 64.8066 28.2474C64.4839 27.4318 64.3178 26.5576 64.3178 25.6747C64.3178 24.7918 64.4839 23.9175 64.8066 23.1019C65.1236 22.3177 65.5811 21.6045 66.1543 21.0006C66.7308 20.3976 67.4083 19.9109 68.1529 19.5647C68.9235 19.2059 69.7582 19.0231 70.6015 19.0286C71.4512 19.0246 72.2924 19.2072 73.0707 19.5647C73.8234 19.907 74.5083 20.3941 75.0898 21.0006C75.6623 21.6046 76.119 22.3179 76.4352 23.1019C76.7588 23.9173 76.9253 24.7916 76.9253 25.6747C76.9253 26.5577 76.7588 27.4321 76.4352 28.2474Z" fill="#0D1827"></path><path d="M90.1699 27.0397C89.8001 26.499 89.3232 26.0484 88.772 25.7186C88.2001 25.3726 87.5934 25.094 86.9629 24.8881C86.3188 24.6727 85.7158 24.4446 85.1539 24.2036C84.6364 23.9877 84.157 23.6827 83.7354 23.3014C83.5414 23.1135 83.3893 22.8831 83.2898 22.6267C83.1903 22.3702 83.1459 22.094 83.1598 21.8176C83.1492 21.3973 83.2271 20.9797 83.3882 20.5946C83.5317 20.2728 83.7481 19.9926 84.0186 19.7785C84.2868 19.5632 84.5903 19.401 84.914 19.2998C85.2305 19.2006 85.559 19.1498 85.8894 19.1491H86.3165C86.5462 19.152 86.7753 19.1737 87.0017 19.2137C87.2698 19.2597 87.5346 19.3244 87.7943 19.4075C88.0467 19.4849 88.2803 19.6179 88.4796 19.7976V22.088H90.1082V18.948C89.8051 18.6037 89.4383 18.3277 89.0301 18.1367C88.6187 17.9424 88.1893 17.7932 87.7487 17.6916C87.3672 17.5997 86.9803 17.535 86.5906 17.4977C86.2503 17.4714 86.0264 17.457 85.9191 17.457C85.3996 17.4622 84.8844 17.5551 84.3932 17.7323C83.8737 17.9116 83.391 18.1917 82.9702 18.5579C82.5394 18.9395 82.1866 19.4084 81.9332 19.9365C81.6569 20.5356 81.5222 21.1955 81.5403 21.8606C81.5403 22.794 81.7322 23.5168 82.116 24.0146C82.5007 24.5248 82.9841 24.944 83.5344 25.2447C84.1151 25.5629 84.728 25.8118 85.3617 25.9866C85.984 26.1579 86.5945 26.373 87.189 26.6304C87.7069 26.8479 88.1743 27.1792 88.5595 27.6021C88.9136 28.0065 89.0917 28.5809 89.0917 29.33C89.1079 29.8194 88.9803 30.3023 88.7263 30.7133C88.4959 31.0738 88.2067 31.389 87.872 31.6443C87.5655 31.879 87.2212 32.0541 86.8556 32.1613C86.5656 32.2529 86.2652 32.3036 85.9625 32.312C85.3839 32.3126 84.806 32.2694 84.2334 32.1828C83.6534 32.0968 83.1034 31.8589 82.6345 31.4911V29.2869H81.0059V32.4413C81.3141 32.7884 81.6884 33.064 82.1045 33.2502C82.5373 33.4526 82.9869 33.6128 83.4476 33.7288C83.8822 33.839 84.3232 33.9189 84.7678 33.9682C85.1881 34.0112 85.5353 34.0328 85.8049 34.0328C86.5956 34.0585 87.3815 33.8948 88.1027 33.5541C88.6891 33.2691 89.2097 32.8543 89.6285 32.3384C89.9959 31.8792 90.2786 31.3526 90.4622 30.7851C90.6295 30.2848 90.7189 29.7596 90.7272 29.2295C90.7249 28.3033 90.5376 27.5782 90.1699 27.0397Z" fill="#0D1827"></path><path d="M102.355 19.4113V17.7049H97.6775V7.30859H96.0512V17.7049H92.5039V19.4113H96.042V33.6848H101.003V31.9808H97.6684V19.4113H102.355Z" fill="#0D1827"></path><path d="M122.579 27.1231V31.9814H108.386V19.4957H122.049V17.7917H108.386V5.56216H122.011V10.4205H123.637V3.87012H103.831V5.57412H106.759V31.9814H103.831V33.6854H124.206V27.1231H122.579Z" fill="#0D1827"></path><path d="M133.802 18.5792C132.593 19.355 131.631 20.4895 131.038 21.8388C131.038 21.3601 131.024 20.9174 130.997 20.5201C130.969 20.1228 130.944 19.6825 130.917 19.199L130.878 17.7056H126.607V19.412H129.535V31.9814H126.362V33.6854H134.17V31.9814H131.161V24.9309C131.155 24.1319 131.323 23.3418 131.652 22.6214C131.971 21.9198 132.423 21.2941 132.982 20.7834C133.562 20.2581 134.227 19.8456 134.946 19.5652C135.726 19.2598 136.549 19.0931 137.381 19.0722L137.504 17.3682C136.189 17.4151 134.909 17.8335 133.802 18.5792Z" fill="#0D1827"></path><path d="M154.318 31.9811V17.7053H152.861C152.833 18.3323 152.797 18.9577 152.753 19.5816C152.712 20.2062 152.689 20.8309 152.689 21.4555C152.472 20.923 152.179 20.4276 151.821 19.986C151.41 19.4707 150.926 19.0251 150.385 18.665C149.792 18.2684 149.153 17.9531 148.484 17.7268C147.765 17.4839 147.014 17.3619 146.259 17.3654C145.189 17.3579 144.129 17.5829 143.146 18.026C142.201 18.4473 141.343 19.0551 140.617 19.8161C139.9 20.5748 139.324 21.4678 138.92 22.4487C138.501 23.4637 138.287 24.5591 138.292 25.6653C138.284 26.7857 138.498 27.8957 138.92 28.9249C139.319 29.9086 139.895 30.8025 140.617 31.5575C141.348 32.3072 142.205 32.9071 143.146 33.3261C144.857 34.0798 146.763 34.1922 148.543 33.6444C149.214 33.4401 149.855 33.1388 150.446 32.7493C150.976 32.4008 151.453 31.9699 151.86 31.4713C152.22 31.0433 152.514 30.5587 152.73 30.0354C152.73 30.3489 152.73 30.6672 152.71 30.9927C152.689 31.3181 152.689 31.6532 152.689 31.993V33.6971H157.326V31.993L154.318 31.9811ZM152.034 28.2619C151.4 29.8418 150.201 31.0993 148.694 31.7657C147.91 32.1138 147.065 32.289 146.214 32.2802C145.355 32.2871 144.505 32.1121 143.713 31.7657C142.965 31.4413 142.287 30.9618 141.721 30.3561C141.161 29.7493 140.712 29.0394 140.398 28.2619C140.071 27.4503 139.906 26.5773 139.912 25.6964C139.907 24.8086 140.073 23.9289 140.398 23.1093C140.709 22.3234 141.157 21.6057 141.721 20.9936C142.287 20.3878 142.965 19.9083 143.713 19.584C144.505 19.2376 145.355 19.0626 146.214 19.0694C147.065 19.0607 147.91 19.2358 148.694 19.584C149.834 20.0963 150.805 20.9493 151.485 22.0364C152.165 23.1235 152.524 24.3966 152.518 25.6964C152.527 26.5769 152.364 27.4501 152.038 28.2619H152.034Z" fill="#0D1827"></path><path d="M31.0609 10.2577C28.9333 10.1372 26.8441 10.8867 25.2335 12.3484C23.6229 13.81 22.6167 15.8696 22.4268 18.0933L14.3409 18.0621L10.1381 11.4567C11.236 10.4887 11.9773 9.14991 12.2345 7.67084C12.4917 6.19177 12.2486 4.66503 11.5472 3.35352C10.8457 2.04202 9.72968 1.02784 8.39138 0.485641C7.05307 -0.0565585 5.5762 -0.0928452 4.21511 0.38303C2.85402 0.858906 1.69389 1.81716 0.9345 3.09277C0.175114 4.36838 -0.135996 5.88151 0.0547453 7.37158C0.245486 8.86166 0.92614 10.2354 1.97949 11.2563C3.03285 12.2771 4.39297 12.8812 5.82563 12.9645C6.92494 13.0298 8.02058 12.7816 8.99603 12.2465L13.2445 18.9094L11.7416 24.9476C11.5817 24.9236 11.4172 24.9069 11.2528 24.8973C9.76952 24.8132 8.31049 25.3178 7.1664 26.3104C6.02231 27.3031 5.27716 28.7109 5.07943 30.2534C4.8817 31.796 5.24591 33.3599 6.09949 34.6337C6.95306 35.9074 8.23333 36.7975 9.68518 37.1264C11.137 37.4554 12.6539 37.1991 13.9335 36.4087C15.2131 35.6183 16.1615 34.3517 16.5897 32.8614C17.0179 31.3711 16.8945 29.7665 16.2441 28.3672C15.5937 26.968 14.464 25.8769 13.0801 25.3113L14.5259 19.5005L22.4451 19.5316C22.5711 21.1784 23.1471 22.7523 24.1043 24.065C25.0615 25.3778 26.3594 26.3739 27.8427 26.9341C29.326 27.4943 30.9319 27.595 32.4684 27.2241C34.0048 26.8532 35.4068 26.0264 36.5066 24.8426C37.6064 23.6588 38.3575 22.1681 38.6699 20.5488C38.9824 18.9296 38.8431 17.2502 38.2687 15.7117C37.6942 14.1732 36.709 12.8407 35.4307 11.8735C34.1525 10.9062 32.6354 10.3453 31.0609 10.2577ZM5.90101 11.5285C4.95406 11.4726 4.04419 11.1238 3.2864 10.5262C2.52861 9.92856 1.95692 9.10897 1.64358 8.17101C1.33025 7.23304 1.28933 6.2188 1.52601 5.25647C1.76269 4.29415 2.26634 3.42694 2.97331 2.76446C3.68027 2.10198 4.5588 1.67397 5.49787 1.53452C6.43694 1.39507 7.39439 1.55044 8.2492 1.981C9.10401 2.41156 9.81781 3.09798 10.3004 3.95349C10.783 4.80901 11.0126 5.79522 10.9604 6.78748C10.8867 8.11806 10.313 9.3639 9.36486 10.2524C8.4167 11.1409 7.17125 11.5998 5.90101 11.5285ZM15.4396 31.3256C15.3917 32.2632 15.0794 33.1649 14.5423 33.9165C14.0051 34.6681 13.2673 35.2359 12.4221 35.548C11.5769 35.86 10.6623 35.9024 9.79412 35.6697C8.92593 35.437 8.14312 34.9397 7.54476 34.2407C6.9464 33.5417 6.55937 32.6725 6.43266 31.743C6.30595 30.8134 6.44525 29.8654 6.83293 29.0189C7.22061 28.1723 7.83924 27.4653 8.61055 26.9872C9.38186 26.5092 10.2712 26.2816 11.166 26.3333C12.3648 26.4043 13.4878 26.9705 14.2889 27.9076C15.09 28.8448 15.5038 30.0765 15.4396 31.3328V31.3256ZM30.2295 25.991C28.8787 25.9136 27.5802 25.4182 26.4983 24.5674C25.4163 23.7166 24.5994 22.5488 24.151 21.2115C23.7026 19.8743 23.6428 18.4277 23.9791 17.0548C24.3154 15.6819 25.0328 14.4444 26.0405 13.4988C27.0481 12.5531 28.3009 11.9418 29.6401 11.7423C30.9794 11.5427 32.3451 11.7638 33.5645 12.3775C34.7838 12.9913 35.8021 13.9702 36.4904 15.1904C37.1787 16.4106 37.5062 17.8172 37.4314 19.2325C37.3293 21.129 36.5141 22.906 35.1643 24.1741C33.8144 25.4422 32.0399 26.0981 30.2295 25.9982V25.991Z" fill="#0D1827"></path>
        <path d="M8.31507 8.0685L8.16432 7.95825L7.85596 7.73535" fill="#0D1827"></path>
        <path d="M11.746 27.877L11.3828 29.2627C11.6718 29.3426 11.9372 29.4967 12.155 29.7111C12.3729 29.9256 12.5362 30.1935 12.6303 30.4908C12.7244 30.788 12.7463 31.1051 12.694 31.4135C12.6417 31.7218 12.5168 32.0116 12.3307 32.2566L13.386 33.1756C13.8086 32.6321 14.0543 31.9612 14.0872 31.261C14.1258 30.5013 13.9144 29.7508 13.4882 29.1348C13.0621 28.5189 12.4471 28.0748 11.746 27.877Z" fill="#0D1827"></path>
        <path d="M7.07705 3.00586L6.71387 4.38917C7.04967 4.48378 7.35731 4.66553 7.60836 4.91763C7.85941 5.16973 8.04579 5.48405 8.15028 5.83156C8.25476 6.17907 8.27398 6.54857 8.20617 6.90592C8.13836 7.26327 7.9857 7.59695 7.76229 7.87616L8.81528 8.79517C9.18513 8.33139 9.43774 7.7776 9.54986 7.18476C9.66199 6.59192 9.63003 5.97905 9.45693 5.40253C9.28383 4.82602 8.97515 4.30436 8.55928 3.88556C8.14341 3.46675 7.6337 3.16425 7.07705 3.00586Z" fill="#0D1827"></path>
        <path d="M32.0588 13.3164L31.6934 14.6997C32.3532 14.8935 32.9563 15.257 33.448 15.7571C33.9396 16.2573 34.3041 16.8783 34.5084 17.5636C34.7127 18.249 34.7502 18.977 34.6176 19.6814C34.485 20.3858 34.1864 21.0443 33.7491 21.5971L34.8021 22.5161C35.3859 21.7791 35.7846 20.9008 35.9618 19.9612C36.139 19.0216 36.0891 18.0504 35.8167 17.1361C35.5443 16.2218 35.058 15.3934 34.4021 14.7263C33.7461 14.0592 32.9414 13.5745 32.0611 13.3164H32.0588Z" fill="#0D1827"></path>
      </svg>
      
      <span style={style}> - Webdev Interview Challenge</span>
    </header>
  );
};
