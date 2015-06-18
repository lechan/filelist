<?php
if (! function_exists('apiPost')) {

    function apiPost ($url, $data, $timeout = 3, $tk_ck = 0)
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
            curl_setopt($ch, CURLOPT_REFERER, '');
            if ($tk_ck && $_COOKIE) {
                $cookie = joinCookie();
                curl_setopt($ch, CURLOPT_COOKIE, $cookie);
            }
            $output = curl_exec($ch);
            if ($output === FALSE)
                throw new Exception(curl_error($ch));
            curl_close($ch);
            return $output;
        } catch (Exception $e) {
            curl_close($ch);
            throw $e;
        }
    }
}
if (! function_exists('apiGet')) {

    function apiGet ($url, $timeout = 3, $tk_ck = 0)
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
            if ($tk_ck && $_COOKIE) {
                $cookie = joinCookie();
                curl_setopt($ch, CURLOPT_COOKIE, $cookie);
            }
            $output = curl_exec($ch);
            if ($output === FALSE)
                throw new Exception(curl_error($ch));
            curl_close($ch);
            return $output;
        } catch (Exception $e) {
            curl_close($ch);
            throw $e;
        }
    }
}
if (! function_exists('joinCookie')) {

    function joinCookie ()
    {
        foreach ($_COOKIE as $k => $v) {
            $d[] = $k . "=" . urlencode($v);
        }
        $data = implode("; ", $d);
        return $data;
    }
}