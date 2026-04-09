*** Settings ***
Library         SeleniumLibrary
Library         ${CURDIR}/../resources/BraveLibrary.py
Resource        ../resources/variables.robot
Suite Setup     Mo Brave Va Vao Trang Login
Suite Teardown  Close All Browsers

*** Keywords ***
Mo Brave Va Vao Trang Login
    Open Brave Browser    ${FRONTEND_URL}/login

Nhap Thong Tin Va Submit
    [Arguments]    ${username}    ${password}
    Go To    ${FRONTEND_URL}/login
    Input Text      xpath=//input[@autocomplete='username']          ${username}
    Input Text      xpath=//input[@autocomplete='current-password']  ${password}
    Click Button    xpath=//button[@type='submit']

*** Test Cases ***
TC01 - Dang Nhap Thanh Cong
    [Documentation]    Dang nhap voi tai khoan hop le, chuyen ve trang chu
    Nhap Thong Tin Va Submit    ${VALID_USER}    ${VALID_PASS}
    Sleep    2s
    Location Should Be    ${FRONTEND_URL}/

TC02 - Dang Nhap Sai Mat Khau
    [Documentation]    Dang nhap voi mat khau sai, hien thong bao loi
    Nhap Thong Tin Va Submit    ${VALID_USER}    ${INVALID_PASS}
    Sleep    2s
    Page Should Contain    không đúng

TC03 - Bo Trong Ten Dang Nhap
    [Documentation]    De trong ten dang nhap, hien canh bao validate
    Nhap Thong Tin Va Submit    ${EMPTY}    ${VALID_PASS}
    Sleep    1s
    Page Should Contain    Vui lòng điền đầy đủ

TC04 - Bo Trong Mat Khau
    [Documentation]    De trong mat khau, hien canh bao validate
    Nhap Thong Tin Va Submit    ${VALID_USER}    ${EMPTY}
    Sleep    1s
    Page Should Contain    Vui lòng điền đầy đủ

TC05 - Dang Nhap Bang Email Khong Ton Tai
    [Documentation]    Dang nhap bang email chua dang ky, hien thong bao loi
    Nhap Thong Tin Va Submit    ${INVALID_EMAIL}    ${VALID_PASS}
    Sleep    2s
    Page Should Contain    không đúng
