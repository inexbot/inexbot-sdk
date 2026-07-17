# 使用servoJ进行关节控制

## 接口说明

```cpp
/**
 * @brief 打开关节跟踪模式
 * @param vmax 速度约束 单位 度/秒
 * @param amax 加速度约束 单位 度/秒^2
 * @param jmax 加加速度约束 单位 度/秒^3
 */
Result open_servoJ(SOCKETFD socketFd, std::vector<double> vmax, std::vector<double> amax, std::vector<double> jmax);


/**
 * @brief 发送跟踪关节位置
 * @param q 目标位置 单位 度
 */
Result set_servoJ_pos(SOCKETFD socketFd, std::vector<double> q);


/**
 * @brief 关闭关节跟踪模式
 */
Result stop_servoJ(SOCKETFD socketFd);
```

## 使用示例

```cpp
int main()
{
    // 连接6000端口, 用来控制上电，查询机械臂当前位置
    SOCKETFD fd_6000 = connect_robot("192.168.1.13", "6000");
    // 连接7000端口
    SOCKETFD fd_7000 = connect_robot("192.168.1.13", "7000");
    if (fd_6000 < 0 || fd_7000 < 0) 
    {
        return 0; // 连接失败，退出。
    }
    // 设置机器人上电
    std::cout << "就绪: " <<  set_servo_state(fd_6000, 1)<<std::endl;
    std::cout << "上电: " << set_servo_poweron(fd_6000)<<std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(30));
    
    // 设置运动约束
    std::vector<double> vMax = {10, 10, 10, 10, 10, 10, 10};  // 速度 10°/s
    std::vector<double> avMax = {1000, 1000, 1000, 1000, 1000, 1000, 1000}; // 加速度 1000°/s^2
    std::vector<double> jMax = {1000, 1000, 1000, 1000, 1000, 1000, 1000}; // 加加速度 1000°/s^3
    std::cout << "打开关节跟随" << open_servoJ(fd_7000, vMax, avMax, jMax) << std::endl;


    int n = 100
    while(n > 0)
    {
        n--;
        std::cout << "当前位置: " << get_current_position(fd_6000, 0, pos) << std::endl;
    
        // 只对第一个元素 pos[0] 增加 0.5，对应机械臂的1轴
        pos[0] += 0.2;
    
        std::cout << "发送关节跟随" << set_servoJ_pos(fd_7000, pos) << std::endl;
        // 每10ms下发一次新的位置
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }


    // 停止servoJ模式
    stop_servoJ(fd_7000);
    return 0;
}
```
