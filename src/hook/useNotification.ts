import { useState } from 'react';
import { notification } from 'antd';
import {NotificationInstance} from "antd/es/notification/interface";

type OpenNotificationFn = (title: string, description: string) => void;
type ContextHolder = JSX.Element;

const useNotification = (): [((title: string, description: string) => void), readonly [NotificationInstance, React.ReactElement<any, string | React.JSXElementConstructor<any>>]] => {
    const [api, setApi] = useState<null | NotificationInstance>(null);

    const contextHolder = notification.useNotification();

    const openNotification: OpenNotificationFn = (title, description) => {
        if (api) {
            api.open({
                message: title,
                description,
                duration: 0,
            });
        }
    };

    return [openNotification, contextHolder];
};

export default useNotification;